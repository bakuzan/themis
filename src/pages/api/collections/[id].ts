import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { updateCollection } from '@/api/collections';
import { validateRequest } from '@/api/validators/collection';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateRequest(request);
  const collectionId = data.processedData.Id;
  console.log('PUT', typeof request.body, request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return response.redirect(`/collections/${collectionId}/edit`);
    } else {
      return response.json(data);
    }
  }

  updateCollection(data.processedData);

  if (isFormPost) {
    return response.redirect(`/collections/${collectionId}`);
  } else {
    return response.json({
      success: true,
      errorMessages: [],
      id: collectionId
    });
  }
}
