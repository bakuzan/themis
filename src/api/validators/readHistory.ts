import { NextApiRequest } from 'next';

import { ReadHistory } from '@/types/ReadHistory';

import { isFormData } from '@/api/helpers/common';
import { ToggleReadHistoryIssueRequest } from '@/types/ReadHistoryIssue';

export function validateCreateRequest(request: NextApiRequest) {
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
  } else {
    errorMessages.push('Read Order Id is required');
  }

  return {
    success: errorMessages.length === 0,
    errorMessages,
    processedData
  };
}

function validateReadHistoryRequest(request: NextApiRequest) {
  const data = isFormData(request) ? request.body : JSON.parse(request.body);

  const errorMessages = [];
  const processedData: Partial<ReadHistory> = {};

  // Set the id if it exists
  if (data.readHistoryId) {
    const readHistoryId = Number(data.readHistoryId);

    if (isNaN(readHistoryId)) {
      errorMessages.push('Read History Id is required');
    } else {
      processedData.Id = readHistoryId;
    }
  } else {
    errorMessages.push('Read History Id is required');
  }

  return {
    success: errorMessages.length === 0,
    errorMessages,
    processedData
  };
}

export function validateCompleteRequest(request: NextApiRequest) {
  return validateReadHistoryRequest(request);
}

export function validateRemoveRequest(request: NextApiRequest) {
  return validateReadHistoryRequest(request);
}

/* Read History Issue */

export function validateToggleIssueRequest(request: NextApiRequest) {
  const data = isFormData(request) ? request.body : JSON.parse(request.body);
  const errorMessages = [];
  const processedData: Partial<ToggleReadHistoryIssueRequest> = {};

  // Set the id if it exists
  if (data.readHistoryId) {
    const readHistoryId = Number(data.readHistoryId);

    if (isNaN(readHistoryId)) {
      errorMessages.push('Read History Id is required');
    } else {
      processedData.ReadHistoryId = readHistoryId;
    }
  } else {
    errorMessages.push('Read History Id is required');
  }

  if (data.collectionId) {
    const collectionId = Number(data.collectionId);

    if (isNaN(collectionId)) {
      errorMessages.push('collection Id is required');
    } else {
      processedData.CollectionId = collectionId;
    }
  } else {
    processedData.CollectionId = null;
  }

  if (data.issueId) {
    const issueId = Number(data.issueId);

    if (isNaN(issueId)) {
      errorMessages.push('Issue Id is required');
    } else {
      processedData.IssueId = issueId;
    }
  } else {
    errorMessages.push('Issue Id is required');
  }

  return {
    success: errorMessages.length === 0,
    errorMessages,
    processedData: processedData as ToggleReadHistoryIssueRequest
  };
}
