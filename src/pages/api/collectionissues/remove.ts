import { NextApiRequest, NextApiResponse } from 'next';

import { CollectionIssue } from '@/types/CollectionIssue';

import { isFormData } from '@/api/helpers/common';
import { removeCollectionIssue } from '@/api/collections';
import { validateRemoveCollectionIssueRequest } from '@/api/validators/collection';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateRemoveCollectionIssueRequest(request);
  const collectionId = data.processedData.CollectionId;
  console.log('DELETE', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return response.redirect(`/collections/${collectionId}`);
    } else {
      return response.json(data);
    }
  }

  const collectionIssueForRemoval = data.processedData as CollectionIssue;
  removeCollectionIssue(collectionIssueForRemoval);

  if (isFormPost) {
    return response.redirect(`/collections/${collectionId}`);
  } else {
    return response.json({ success: true, errorMessages: [] });
  }
}
