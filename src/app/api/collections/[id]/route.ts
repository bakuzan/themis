import { NextResponse } from 'next/server';

import { isFormData } from '@/api/helpers/common';
import { updateCollection } from '@/api/collections';
import { validateRequest } from '@/api/validators/collection';

export async function PUT(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRequest(request);
  const collectionId = data.processedData.Id;
  console.log('PUT', typeof request.body, request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/collections/${collectionId}/edit`);
    } else {
      return NextResponse.json(data);
    }
  }

  updateCollection(data.processedData);

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
