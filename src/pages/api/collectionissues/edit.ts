import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { reOrderCollectionIssues } from '@/api/collections';
import { validateEditCollectionIssueRequest } from '@/api/validators/collection';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateEditCollectionIssueRequest(request);
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

  reOrderCollectionIssues(data.processedData);

  if (isFormPost) {
    return response.redirect(`/collections/${collectionId}`);
  } else {
    return response.json({ success: true, errorMessages: [] });
  }
}
