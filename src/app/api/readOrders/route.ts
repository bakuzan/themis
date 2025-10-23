import { NextResponse } from 'next/server';

import { isFormData } from '@/database/helpers/common';
import { insertReadOrder } from '@/database/readOrders';
import { validateRequest } from '@/database/validators/readOrder';

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
