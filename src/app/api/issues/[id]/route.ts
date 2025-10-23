import { NextResponse } from 'next/server';

import { isFormData } from '@/api/helpers/common';
import { updateIssue } from '@/api/issues';
import { validateRequest } from '@/api/validators/issue';

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
