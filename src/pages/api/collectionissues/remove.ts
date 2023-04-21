import { NextApiRequest, NextApiResponse } from 'next';

import { CollectionIssue } from '@/types/CollectionIssue';

import { isFormData } from '@/api/helpers/common';
import { removeCollectionIssue } from '@/api/collections';
import { validateCollectionIssueRequest } from '@/api/validators/collection';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateCollectionIssueRequest(request);
  const collectionId = data.processedData.CollectionId;
  console.log('DELETE', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      response.redirect(`/collections/${collectionId}`);
    } else {
      response.json(data);
    }
  }

  const collectionIssueForRemoval = data.processedData as CollectionIssue;
  removeCollectionIssue(collectionIssueForRemoval);

  if (isFormPost) {
    response.redirect(`/collections/${collectionId}`);
  } else {
    response.json({ success: true, errorMessages: [] });
  }
}
