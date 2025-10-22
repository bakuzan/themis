import { NextResponse } from 'next/server';

import { isFormData } from '@/api/helpers/common';
import { toggleReadHistoryIssue } from '@/api/readHistory';
import { validateToggleIssueRequest } from '@/api/validators/readHistory';

export async function POST(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateToggleIssueRequest(request);
  const readHistoryId = data.processedData.ReadHistoryId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(
        request.headers.get('referer') ?? `/readHistory/${readHistoryId}`
      );
    } else {
      return NextResponse.json(data);
    }
  }

  toggleReadHistoryIssue(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/readHistory/${readHistoryId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [] });
  }
}
