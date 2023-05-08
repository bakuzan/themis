import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { createReadHistoryInstance } from '@/api/readHistory';
import { validateRequest } from '@/api/validators/readHistory';

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
      return response.redirect(`/`);
    } else {
      return response.json(data);
    }
  }

  const readOrderId = data.processedData.ReadOrderId as number;
  const readHistoryId = createReadHistoryInstance(readOrderId);

  if (isFormPost) {
    return response.redirect(`/readHistory/${readHistoryId}`);
  } else {
    return response.json({
      success: true,
      errorMessages: [],
      id: readHistoryId
    });
  }
}
