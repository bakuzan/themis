import { Issue } from '@/types/Issue';

import { isFormData, isNullOrEmpty } from '@/database/helpers/common';

export async function validateRequest(request: Request) {
  const data = await (isFormData(request)
    ? request.formData()
    : request.json());

  const errorMessages = [];
  const processedData: Partial<Issue> = {};

  // Set the id if it exists (must be an update)
  if (data.id) {
    processedData.Id = Number(data.id);
  }

  if (data.titleId && !isNaN(data.titleId)) {
    processedData.TitleId = Number(data.titleId);
  } else {
    errorMessages.push('Issue Title is required');
  }

  if (isNullOrEmpty(data.number)) {
    errorMessages.push('Issue Number is required');
  } else {
    const issueNumber = Number(data.number);

    if (isNaN(issueNumber)) {
      errorMessages.push('Issue Number must be a valid number');
    } else {
      processedData.Number = issueNumber;
    }
  }

  if (isNullOrEmpty(data.name)) {
    errorMessages.push('Issue Name is required');
  } else {
    processedData.Name = data.name.trim();
  }

  if (isNullOrEmpty(data.coverDate)) {
    errorMessages.push('Issue Cover Date is required');
  } else {
    const regex = new RegExp(/^\d{4}-(0?[1-9]|1[012])$/);
    if (regex.test(data.coverDate)) {
      processedData.CoverDate = data.coverDate;
    } else {
      errorMessages.push(
        'Issue Cover Date should match the date pattern YYYY-MM'
      );
    }
  }

  processedData.IsAnnual = data.isAnnual && data.isAnnual !== 'off' ? 1 : 0;

  return {
    success: errorMessages.length === 0,
    errorMessages,
    processedData
  };
}
