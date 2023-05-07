import { NextApiRequest, NextApiResponse } from 'next';

import { CollectionIssue } from '@/types/CollectionIssue';

import { isFormData } from '@/api/helpers/common';
import {
  checkCollectionIssueDoesNotExist,
  insertCollectionIssue
} from '@/api/collections';
import { validateCollectionIssueRequest } from '@/api/validators/collection';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  let data = validateCollectionIssueRequest(request);
  const collectionId = data.processedData.CollectionId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return response.redirect(`/collections/${collectionId}`);
    } else {
      return response.json(data);
    }
  }

  const newCollectionIssue = data.processedData as CollectionIssue;

  // This should only insert request if it doesn't already exist.
  if (checkCollectionIssueDoesNotExist(newCollectionIssue)) {
    insertCollectionIssue(newCollectionIssue);
  }

  if (isFormPost) {
    return response.redirect(`/collections/${collectionId}`);
  } else {
    return response.json({ success: true, errorMessages: [] });
  }
}
