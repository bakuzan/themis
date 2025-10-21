import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { updateIssue } from '@/api/issues';
import { validateRequest } from '@/api/validators/issue';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateRequest(request);
  const issueId = data.processedData.Id;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return response.redirect(`/issues/${issueId}`);
    } else {
      return response.json(data);
    }
  }

  updateIssue(data.processedData);

  if (isFormPost) {
    return response.redirect(`/issues/${issueId}`);
  } else {
    return response.json({ success: true, errorMessages: [], id: issueId });
  }
}
