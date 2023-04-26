import { NextApiRequest } from 'next';

import { ReadOrder } from '@/types/ReadOrder';
import { ReadOrderIssuesRequest } from '@/types/ReadOrderIssue';

import { isFormData, isNullOrEmpty } from '@/api/helpers/common';
import { AddReadOrderIssuesRequest } from '@/types/ReadOrderIssue';
import { RemoveReadOrderIssuesRequest } from '@/types/ReadOrderIssue';

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

/* Read Order Issue Validators */
function validateReadOrderIssueRequest<T extends ReadOrderIssuesRequest>(
  data: any
) {
  const errorMessages = [];
  const processedData: Partial<ReadOrderIssuesRequest> = {};

  // Set the id if it exists (must be an update)
  processedData.ReadOrderId = Number(data.readOrderId);

  if (!data.collectionId && !data.issueId) {
    errorMessages.push('Either Collection Id or Issue Id are required');
  } else if (data.collectionId) {
    const collectionId = Number(data.collectionId);

    if (isNaN(collectionId)) {
      errorMessages.push('Collection Id should be a number');
    } else {
      processedData.CollectionId = collectionId;
      processedData.IssueId = null;
    }
  } else {
    const issueId = Number(data.issueId);

    if (isNaN(issueId)) {
      errorMessages.push('Issue Id should be a number');
    } else {
      processedData.CollectionId = null;
      processedData.IssueId = issueId;
    }
  }

  return {
    success: errorMessages.length === 0,
    errorMessages,
    processedData: processedData as T
  };
}

export function validateAddReadOrderIssueRequest(request: NextApiRequest) {
  const data = isFormData(request) ? request.body : JSON.parse(request.body);
  const response =
    validateReadOrderIssueRequest<AddReadOrderIssuesRequest>(data);

  if (!response.success) {
    return response;
  }

  if (!isNullOrEmpty(data.beforeReadOrderIssueKey)) {
    const parts = data.beforeReadOrderIssueKey.split('_');

    if (parts.length === 3) {
      const [_, collectionIdStr, issueIdStr] = parts;
      const CollectionId = parseInt(collectionIdStr);
      const IssueId = parseInt(issueIdStr);

      if (!isNaN(IssueId)) {
        response.processedData.BeforeReadOrderIssue = {
          CollectionId: isNaN(CollectionId) ? null : CollectionId,
          IssueId
        };
      }
    }
  }

  return response;
}

export function validateRemoveReadOrderIssueRequest(request: NextApiRequest) {
  const data = isFormData(request) ? request.body : JSON.parse(request.body);
  return validateReadOrderIssueRequest<RemoveReadOrderIssuesRequest>(data);
}
