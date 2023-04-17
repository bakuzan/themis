import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { insertCollectionIssue } from '@/api/collections';
import { validateCollectionIssueRequest } from '@/api/validators/collection';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateCollectionIssueRequest(request);
  const collectionId = data.processedData.CollectionId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      response.redirect(`/collections/${collectionId}`);
    } else {
      response.json(data);
    }
  }

  insertCollectionIssue(data.processedData);

  if (isFormPost) {
    response.redirect(`/collections/${collectionId}`);
  } else {
    response.json({ success: true, errorMessages: [] });
  }
}
