import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { insertReadOrderIssues } from '@/api/readOrders';
import { validateAddReadOrderIssueRequest } from '@/api/validators/readOrder';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateAddReadOrderIssueRequest(request);
  const readOrderId = data.processedData.ReadOrderId;
  console.log('POST', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return response.redirect(`/readOrders/${readOrderId}`);
    } else {
      return response.json(data);
    }
  }

  insertReadOrderIssues(data.processedData);

  if (isFormPost) {
    return response.redirect(`/readOrders/${readOrderId}`);
  } else {
    return response.json({ success: true, errorMessages: [] });
  }
}
