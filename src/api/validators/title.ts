import { NextApiRequest } from 'next';

import { Title } from '@/types/Title';

import { isFormData, isNullOrEmpty } from '@/api/helpers/common';

export function validateRequest(request: NextApiRequest) {
  const data = isFormData(request) ? request.body : JSON.parse(request.body);

  const errorMessages = [];
  const processedData: Partial<Title> = {};

  // Set the id if it exists (must be an update)
  if (data.id) {
    processedData.Id = Number(data.id);
  }

  if (isNullOrEmpty(data.name)) {
    errorMessages.push('Title Name is required');
  } else {
    processedData.Name = data.name.trim();
  }

  if (!data.startYear) {
    errorMessages.push('Title Start Year is required');
  } else {
    const startYear = Number(data.startYear);
    if (isNaN(startYear) || startYear < 1930 || startYear >= 2100) {
      errorMessages.push(
        'Title Start Year should be a number between 1930 and 2100'
      );
    } else {
      processedData.StartYear = `${startYear}`;
    }
  }

  processedData.IsOneShot = data.isOneShot && data.isOneShot !== 'off' ? 1 : 0;

  return {
    success: errorMessages.length === 0,
    errorMessages,
    processedData
  };
}
