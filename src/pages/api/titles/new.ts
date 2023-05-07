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
      return response.redirect(`/titles/new`);
    } else {
      return response.json(data);
    }
  }

  const titleId = insertTitle(data.processedData);

  if (isFormPost) {
    return response.redirect(`/titles/${titleId}`);
  } else {
    return response.json({ success: true, errorMessages: [], id: titleId });
  }
}
