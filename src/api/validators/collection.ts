import { NextApiRequest } from 'next';

import { Collection } from '@/types/Collection';

import { isFormData, isNullOrEmpty } from '@/api/helpers/common';

export function validateRequest(request: NextApiRequest) {
  const data = isFormData(request) ? request.body : JSON.parse(request.body);

  const errorMessages = [];
  const processedData: Partial<Collection> = {};

  // Set the id if it exists (must be an update)
  if (data.id) {
    processedData.Id = Number(data.id);
  }

  if (isNullOrEmpty(data.name)) {
    errorMessages.push('Collection Name is required');
  } else {
    processedData.Name = data.name.trim();
  }

  if (!data.publicationDate) {
    errorMessages.push('Collection Publication Date is required');
  } else {
    const publicationDate = Number(data.publicationDate);

    if (
      isNaN(publicationDate) ||
      publicationDate < 1930 ||
      publicationDate >= 2100
    ) {
      errorMessages.push(
        'Collection Publication Date should be a number between 1930 and 2100'
      );
    } else {
      processedData.PublicationDate = `${publicationDate}`;
    }
  }

  if (data.number) {
    const collectionNumber = Number(data.number);

    if (isNaN(collectionNumber) || collectionNumber < 1) {
      errorMessages.push(
        'Collection Number should be a number greater than 0.'
      );
    } else {
      processedData.Number = collectionNumber;
    }
  } else {
    processedData.Number = null;
  }

  return {
    success: errorMessages.length === 0,
    errorMessages,
    processedData
  };
}
