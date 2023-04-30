import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { reOrderReadOrderIssues } from '@/api/readOrders';
import { validateEditReadOrderIssueRequest } from '@/api/validators/readOrder';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateEditReadOrderIssueRequest(request);
  const readOrderId = data.processedData.ReadOrderId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      response.redirect(`/readOrders/${readOrderId}`);
    } else {
      response.json(data);
    }
  }

  reOrderReadOrderIssues(data.processedData);

  if (isFormPost) {
    response.redirect(`/readOrders/${readOrderId}`);
  } else {
    response.json({ success: true, errorMessages: [] });
  }
}
