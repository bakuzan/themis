import { NextApiRequest, NextApiResponse } from 'next';

import { getMonthCountDetailItems } from '@/api/stats';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const key = request.query.key as string;
  const detailItems = getMonthCountDetailItems(key);

  return response.json(detailItems);
}
