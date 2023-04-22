import { NextApiRequest } from 'next';

import { ReadOrder } from '@/types/ReadOrder';

import { isFormData, isNullOrEmpty } from '@/api/helpers/common';

export function validateRequest(request: NextApiRequest) {
  const data = isFormData(request) ? request.body : JSON.parse(request.body);

  const errorMessages = [];
  const processedData: Partial<ReadOrder> = {};

  // Set the id if it exists (must be an update)
  if (data.id) {
    processedData.Id = Number(data.id);
  }

  if (isNullOrEmpty(data.name)) {
    errorMessages.push('Read Order Name is required');
  } else {
    processedData.Name = data.name.trim();
  }

  return {
    success: errorMessages.length === 0,
    errorMessages,
    processedData
  };
}
