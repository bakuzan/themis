import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { toggleReadHistoryIssue } from '@/api/readHistory';
import { validateToggleIssueRequest } from '@/api/validators/readHistory';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateToggleIssueRequest(request);
  const readHistoryId = data.processedData.ReadHistoryId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return response.redirect(
        request.headers.referer ?? `/readHistory/${readHistoryId}`
      );
    } else {
      return response.json(data);
    }
  }

  toggleReadHistoryIssue(data.processedData);

  if (isFormPost) {
    return response.redirect(`/readHistory/${readHistoryId}`);
  } else {
    return response.json({ success: true, errorMessages: [] });
  }
}
