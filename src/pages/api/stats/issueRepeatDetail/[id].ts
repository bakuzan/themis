import { NextApiRequest, NextApiResponse } from 'next';

import { getIssueRepeatDetailItems } from '@/api/stats';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const key = request.query.id as string;
  const id = Number(key);
  const detailItems = getIssueRepeatDetailItems(id);

  return response.json(detailItems);
}
