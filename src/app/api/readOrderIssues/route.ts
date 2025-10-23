import { NextResponse } from 'next/server';

import { isFormData } from '@/database/helpers/common';
import {
  insertReadOrderIssues,
  reOrderReadOrderIssues,
  removeReadOrderIssues
} from '@/database/readOrders';
import {
  validateAddReadOrderIssueRequest,
  validateEditReadOrderIssueRequest,
  validateRemoveReadOrderIssueRequest
} from '@/database/validators/readOrder';

export async function POST(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateAddReadOrderIssueRequest(request);
  const readOrderId = data.processedData.ReadOrderId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/readOrders/${readOrderId}`);
    } else {
      return NextResponse.json(data);
    }
  }

  insertReadOrderIssues(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/readOrders/${readOrderId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [] });
  }
}

export async function PUT(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateEditReadOrderIssueRequest(request);
  const readOrderId = data.processedData.ReadOrderId;
  console.log('PUT', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/readOrders/${readOrderId}`);
    } else {
      return NextResponse.json(data);
    }
  }

  reOrderReadOrderIssues(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/readOrders/${readOrderId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [] });
  }
}

export async function DELETE(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRemoveReadOrderIssueRequest(request);
  const readOrderId = data.processedData.ReadOrderId;
  console.log('DELETE', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/readOrders/${readOrderId}`);
    } else {
      return NextResponse.json(data);
    }
  }

  removeReadOrderIssues(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/readOrders/${readOrderId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [] });
  }
}
