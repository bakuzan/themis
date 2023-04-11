import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const headersList = request.headers;
  const referer = headersList['referer'];

  console.log('PUT', referer, request, request.body);

  return response.json({ success: true, referer });
}