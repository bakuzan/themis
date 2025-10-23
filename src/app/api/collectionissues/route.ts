import { NextResponse } from 'next/server';

import { CollectionIssue } from '@/types/CollectionIssue';

import { isFormData } from '@/database/helpers/common';
import {
  checkCollectionIssueDoesNotExist,
  insertCollectionIssues,
  reOrderCollectionIssues,
  removeCollectionIssue
} from '@/database/collections';
import {
  validateAddCollectionIssuesRequest,
  validateEditCollectionIssueRequest,
  validateRemoveCollectionIssueRequest
} from '@/database/validators/collection';

export async function POST(request: Request) {
  const isFormPost = isFormData(request);
  let data = await validateAddCollectionIssuesRequest(request);
  const collectionId = data.processedData[0]?.CollectionId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/collections/${collectionId}`);
    } else {
      return NextResponse.json(data);
    }
  }

  // This should only insert request(s) if they don't already exist.
  const newCollectionIssues = data.processedData as CollectionIssue[];
  const newCIs = newCollectionIssues.filter((ci) =>
    checkCollectionIssueDoesNotExist(ci)
  );

  if (newCIs.length > 0) {
    insertCollectionIssues(newCIs);
  }

  if (isFormPost) {
    return NextResponse.redirect(`/collections/${collectionId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [] });
  }
}

export async function PUT(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateEditCollectionIssueRequest(request);
  const collectionId = data.processedData.CollectionId;
  console.log('PUT', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/collections/${collectionId}`);
    } else {
      return NextResponse.json(data);
    }
  }

  reOrderCollectionIssues(data.processedData);

  if (isFormPost) {
    return NextResponse.redirect(`/collections/${collectionId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [] });
  }
}

export async function DELETE(request: Request) {
  const isFormPost = isFormData(request);
  const data = await validateRemoveCollectionIssueRequest(request);
  const collectionId = data.processedData.CollectionId;
  console.log('DELETE', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return NextResponse.redirect(`/collections/${collectionId}`);
    } else {
      return NextResponse.json(data);
    }
  }

  const collectionIssueForRemoval = data.processedData as CollectionIssue;
  removeCollectionIssue(collectionIssueForRemoval);

  if (isFormPost) {
    return NextResponse.redirect(`/collections/${collectionId}`);
  } else {
    return NextResponse.json({ success: true, errorMessages: [] });
  }
}
