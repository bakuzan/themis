import { NextResponse } from 'next/server';

import { isFormData } from '@/database/helpers/common';
import { updateTitle } from '@/database/titles';
import { validateRequest } from '@/database/validators/title';

export async function PUT(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRequest(request);
  const titleId = data.processedData.Id;
  console.log('PUT', typeof request.body, request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/titles/${titleId}/edit`);
    } else {
      return NextResponse.json(data);
    }
  }

  updateTitle(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/titles/${titleId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [], id: titleId });
  }
}
