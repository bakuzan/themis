import { NextResponse } from 'next/server';

import { isFormData } from '@/api/helpers/common';
import { insertReadOrder } from '@/api/readOrders';
import { validateRequest } from '@/api/validators/readOrder';

export async function POST(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRequest(request);
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/readOrders/new`);
    } else {
      return NextResponse.json(data);
    }
  }

  const readOrderId = insertReadOrder(data.processedData);

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
