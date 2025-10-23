import { NextResponse } from 'next/server';

import { isFormData } from '@/database/helpers/common';
import { updateIssue } from '@/database/issues';
import { validateRequest } from '@/database/validators/issue';

export async function PUT(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRequest(request);
  const issueId = data.processedData.Id;
  console.log('PUT', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/issues/${issueId}`);
    } else {
      return NextResponse.json(data);
    }
  }

  updateIssue(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/issues/${issueId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [], id: issueId });
  }
}
