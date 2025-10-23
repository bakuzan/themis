import { NextResponse } from 'next/server';

import { isFormData } from '@/api/helpers/common';
import {
  createReadHistoryInstance,
  toggleReadHistoryComplete,
  canRemoveReadHistory,
  removeReadHistory
} from '@/api/readHistory';
import {
  validateCreateRequest,
  validateCompleteRequest,
  validateRemoveRequest
} from '@/api/validators/readHistory';

export async function POST(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateCreateRequest(request);
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/`);
    } else {
      return NextResponse.json(data);
    }
  }

  const readOrderId = data.processedData.ReadOrderId as number;
  const readHistoryId = createReadHistoryInstance(readOrderId);

  if (isFormPost) {
    return NextResponse.redirect(`/readHistory/${readHistoryId}`);
  } else {
    return NextResponse.json({
      success: true,
      errorMessages: [],
      id: readHistoryId
    });
  }
}

export async function PUT(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateCompleteRequest(request);
  console.log('PUT', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(request.headers.get('referer') as string);
    } else {
      return NextResponse.json(data);
    }
  }

  const readHistoryId = data.processedData.Id as number;
  toggleReadHistoryComplete(readHistoryId);

  if (isFormPost) {
    return NextResponse.redirect(`/readHistory/${readHistoryId}`);
  } else {
    return NextResponse.json({
      success: true,
      errorMessages: []
    });
  }
}

export async function DELETE(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRemoveRequest(request);
  const readHistoryId = data.processedData.Id as number;
  console.log('DELETE', request.body);

  if (!data.success || !canRemoveReadHistory(readHistoryId)) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(request.headers.get('referer') ?? '/');
    } else {
      return NextResponse.json(data);
    }
  }

  removeReadHistory(readHistoryId);

  if (isFormPost) {
    return NextResponse.redirect(`/`);
  } else {
    return NextResponse.json({
      success: true,
      errorMessages: []
    });
  }
}
