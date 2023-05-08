import { NextApiRequest } from 'next';

import { ReadHistory } from '@/types/ReadHistory';

import { isFormData } from '@/api/helpers/common';

export function validateRequest(request: NextApiRequest) {
  const data = isFormData(request) ? request.body : JSON.parse(request.body);

  const errorMessages = [];
  const processedData: Partial<ReadHistory> = {};

  // Set the id if it exists (must be an update)
  if (data.readOrderId) {
    const readOrderId = Number(data.readOrderId);

    if (isNaN(readOrderId)) {
      errorMessages.push('Read Order Id is required');
    } else {
      processedData.ReadOrderId = readOrderId;
    }
  }

  return {
    success: errorMessages.length === 0,
    errorMessages,
    processedData
  };
}
