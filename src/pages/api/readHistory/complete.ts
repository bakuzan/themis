import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { toggleReadHistoryComplete } from '@/api/readHistory';
import { validateCompleteRequest } from '@/api/validators/readHistory';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateCompleteRequest(request);
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return response.redirect(request.headers.referer as string);
    } else {
      return response.json(data);
    }
  }

  const readHistoryId = data.processedData.Id as number;
  toggleReadHistoryComplete(readHistoryId);

  if (isFormPost) {
    return response.redirect(`/readHistory/${readHistoryId}`);
  } else {
    return response.json({
      success: true,
      errorMessages: []
    });
  }
}
