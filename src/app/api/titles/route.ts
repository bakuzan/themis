import { NextResponse } from 'next/server';

import { isFormData } from '@/api/helpers/common';
import { insertTitle } from '@/api/titles';
import { validateRequest } from '@/api/validators/title';

export async function POST(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRequest(request);
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/titles/new`);
    } else {
      return NextResponse.json(data);
    }
  }

  const titleId = insertTitle(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/titles/${titleId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [], id: titleId });
  }
}
