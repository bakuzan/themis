import { NextApiRequest, NextApiResponse } from 'next';

import {
  ReadOrderIssue,
  RemoveReadOrderIssuesRequest
} from '@/types/ReadOrderIssue';

import { isFormData } from '@/api/helpers/common';
import { removeReadOrderIssues } from '@/api/readOrders';
import { validateReadOrderIssueRequest } from '@/api/validators/readOrder';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateReadOrderIssueRequest(request);
  const readOrderId = data.processedData.ReadOrderId;
  console.log('DELETE', request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      response.redirect(`/readOrders/${readOrderId}`);
    } else {
      response.json(data);
    }
  }

  const removalRequest = data.processedData as RemoveReadOrderIssuesRequest;
  removeReadOrderIssues(removalRequest);

  if (isFormPost) {
    response.redirect(`/readOrders/${readOrderId}`);
  } else {
    response.json({ success: true, errorMessages: [] });
  }
}
