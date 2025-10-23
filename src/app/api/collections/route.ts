import { NextResponse } from 'next/server';

import { isFormData } from '@/database/helpers/common';
import { insertCollection } from '@/database/collections';
import { validateRequest } from '@/database/validators/collection';

export async function POST(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRequest(request);
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/collections/new`);
    } else {
      return NextResponse.json(data);
    }
  }

  const collectionId = insertCollection(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/collections/${collectionId}`);
  } else {
    return NextResponse.json({
      success: true,
      errorMessages: [],
      id: collectionId
    });
  }
}
