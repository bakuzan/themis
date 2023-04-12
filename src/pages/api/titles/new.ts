import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { insertTitle } from '@/api/titles';
import { validateRequest } from '@/api/validators/title';

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
      response.redirect(`/titles/new`);
    } else {
      response.json(data);
    }
  }

  const titleId = insertTitle(data.processedData);

  if (isFormPost) {
    response.redirect(`/titles/${titleId}`);
  } else {
    response.json({ success: true, errorMessages: [], id: titleId });
  }
}
