import { NextResponse } from 'next/server';

import { isFormData } from '@/database/helpers/common';
import { insertIssue } from '@/database/issues';
import { validateRequest } from '@/database/validators/issue';

export async function POST(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRequest(request);
  const titleId = data.processedData.TitleId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/titles/${titleId}`);
    } else {
      return NextResponse.json(data);
    }
  }

  const issueId = insertIssue(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/titles/${titleId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [], id: issueId });
  }
}
