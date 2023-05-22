import { NextApiRequest, NextApiResponse } from 'next';

import { CollectionIssue } from '@/types/CollectionIssue';

import { isFormData } from '@/api/helpers/common';
import {
  checkCollectionIssueDoesNotExist,
  insertCollectionIssues
} from '@/api/collections';
import { validateAddCollectionIssuesRequest } from '@/api/validators/collection';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  let data = validateAddCollectionIssuesRequest(request);
  const collectionId = data.processedData[0]?.CollectionId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return response.redirect(`/collections/${collectionId}`);
    } else {
      return response.json(data);
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
    return response.redirect(`/collections/${collectionId}`);
  } else {
    return response.json({ success: true, errorMessages: [] });
  }
}
