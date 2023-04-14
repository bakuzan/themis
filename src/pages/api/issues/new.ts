import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { insertIssue } from '@/api/issues';
import { validateRequest } from '@/api/validators/issue';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateRequest(request);
  const titleId = data.processedData.TitleId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      response.redirect(`/titles/${titleId}`);
    } else {
      response.json(data);
    }
  }

  const issueId = insertIssue(data.processedData);

  if (isFormPost) {
    response.redirect(`/titles/${titleId}`);
  } else {
    response.json({ success: true, errorMessages: [], id: issueId });
  }
}
