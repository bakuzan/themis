import { NextResponse } from 'next/server';

import { isFormData } from '@/database/helpers/common';
import { updateReadOrder } from '@/database/readOrders';
import { validateRequest } from '@/database/validators/readOrder';

export async function PUT(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRequest(request);
  const readOrderId = data.processedData.Id;
  console.log('PUT', typeof request.body, request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/readOrders/${readOrderId}/edit`);
    } else {
      return NextResponse.json(data);
    }
  }

  updateReadOrder(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/readOrders/${readOrderId}`);
  } else {
    return NextResponse.json({
      success: true,
      errorMessages: [],
      id: readOrderId
    });
  }
}
