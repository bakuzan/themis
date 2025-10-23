import { ReadOrder } from '@/types/ReadOrder';
import {
  ReOrderReadOrderIssuesRequest,
  ReadOrderIssuesRequest
} from '@/types/ReadOrderIssue';
import { AddReadOrderIssuesRequest } from '@/types/ReadOrderIssue';
import { RemoveReadOrderIssuesRequest } from '@/types/ReadOrderIssue';

import {
  isFormData,
  isNullOrEmpty,
  returnNumberOrNull
} from '@/database/helpers/common';
import { ReOrderDirection } from '@/constants/ReOrderDirection';

export async function validateRequest(request: Request) {
  const data = await (isFormData(request)
    ? request.formData()
    : request.json());

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

export async function validateAddReadOrderIssueRequest(request: Request) {
  const data = await (isFormData(request)
    ? request.formData()
    : request.json());

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

export async function validateEditReadOrderIssueRequest(request: Request) {
  const data = await (isFormData(request)
    ? request.formData()
    : request.json());

  const errorMessages = [];
  const processedData: Partial<ReOrderReadOrderIssuesRequest> = {};

  // Set the id if it exists (must be an update)
  processedData.ReadOrderId = Number(data.readOrderId);

  if (
    (!data.collectionId && !data.issueId) ||
    (data.collectionId && data.issueId)
  ) {
    errorMessages.push(
      'Either Collection Id or Issue Id are required, but not both'
    );
  } else {
    const collectionId = Number(data.collectionId);
    const issueId = Number(data.issueId);
    processedData.CollectionId = returnNumberOrNull(collectionId);
    processedData.IssueId = returnNumberOrNull(issueId);

    if (
      (!processedData.CollectionId && !processedData.IssueId) ||
      (processedData.CollectionId && processedData.IssueId)
    ) {
      errorMessages.push(
        'Either Collection Id or Issue Id are required, but not both'
      );
    }
  }

  if (!data.direction) {
    errorMessages.push(`Direction should be either 'UP' or 'DOWN'`);
  } else {
    processedData.Direction =
      data.direction === ReOrderDirection.UP
        ? ReOrderDirection.UP
        : ReOrderDirection.DOWN;
  }

  return {
    success: errorMessages.length === 0,
    errorMessages,
    processedData: processedData as ReOrderReadOrderIssuesRequest
  };
}

export async function validateRemoveReadOrderIssueRequest(request: Request) {
  const data = await (isFormData(request)
    ? request.formData()
    : request.json());

  return validateReadOrderIssueRequest<RemoveReadOrderIssuesRequest>(data);
}
