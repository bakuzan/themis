import { NextApiRequest, NextApiResponse } from 'next';

import { isFormData } from '@/api/helpers/common';
import { updateReadOrder } from '@/api/readOrders';
import { validateRequest } from '@/api/validators/readOrder';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isFormPost = isFormData(request);
  const data = validateRequest(request);
  const readOrderId = data.processedData.Id;
  console.log('PUT', typeof request.body, request.body);

  if (!data.success) {
    // The redirect here isn't what I want...I want to return data during the redirect.
    if (isFormPost) {
      return response.redirect(`/readOrders/${readOrderId}/edit`);
    } else {
      return response.json(data);
    }
  }

  updateReadOrder(data.processedData);

  if (isFormPost) {
    return response.redirect(`/readOrders/${readOrderId}`);
  } else {
    return response.json({ success: true, errorMessages: [], id: readOrderId });
  }
}
