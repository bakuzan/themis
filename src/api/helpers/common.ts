import { NextApiRequest } from 'next';

export const isNullOrEmpty = (s: string) => !s || !s.trim();
export const returnNumberOrNull = (n: number) => (isNaN(n) ? null : n);

export const getCurrentTimestamp = () => new Date().toISOString();

export function isFormData(request: NextApiRequest) {
  const headersList = request.headers;
  const accept = headersList['accept'];
  return accept !== 'application/json';
}
