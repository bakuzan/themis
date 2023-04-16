import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { insertCollection } from '@/api/collections';
import { validateRequest } from '@/api/validators/collection';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateRequest(request);
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      response.redirect(`/collections/new`);
    } else {
      response.json(data);
    }
  }

  const collectionId = insertCollection(data.processedData);

  if (isFormPost) {
    response.redirect(`/collections/${collectionId}`);
  } else {
    response.json({ success: true, errorMessages: [], id: collectionId });
  }
}
