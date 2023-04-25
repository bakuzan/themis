import { NextApiRequest, NextApiResponse } from 'next';

import { AddReadOrderIssuesRequest } from '@/types/ReadOrderIssue';

import { isFormData } from '@/api/helpers/common';
import { insertReadOrderIssues } from '@/api/readOrders';
import { validateReadOrderIssueRequest } from '@/api/validators/readOrder';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateReadOrderIssueRequest(request);
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

  const addRequest = data.processedData as AddReadOrderIssuesRequest;
  insertReadOrderIssues(addRequest);

  if (isFormPost) {
    response.redirect(`/readOrders/${readOrderId}`);
  } else {
    response.json({ success: true, errorMessages: [] });
  }
}
