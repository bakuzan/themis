import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { canRemoveReadHistory, removeReadHistory } from '@/api/readHistory';
import { validateRemoveRequest } from '@/api/validators/readHistory';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateRemoveRequest(request);
  const readHistoryId = data.processedData.Id as number;
  console.log('POST', request.body);

  if (!data.success || !canRemoveReadHistory(readHistoryId)) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return response.redirect(request.headers.referer ?? '/');
    } else {
      return response.json(data);
    }
  }

  removeReadHistory(readHistoryId);

  if (isFormPost) {
    return response.redirect(`/`);
  } else {
    return response.json({
      success: true,
      errorMessages: []
    });
  }
}
