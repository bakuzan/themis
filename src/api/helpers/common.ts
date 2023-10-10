import { NextApiRequest } from 'next';

export const isNullOrEmpty = (s: string) =>
  s === undefined || s === null || (typeof s === 'string' && !s.trim());

export const returnNumberOrNull = (n: number) => (isNaN(n) ? null : n);

export const getCurrentTimestamp = () => new Date().toISOString();

export const splitDelimitedToNumbers = (
  data: string,
  separator: string = ','
) => data?.split(separator).map((x) => Number(x)) ?? [];

export function isFormData(request: NextApiRequest) {
  const headersList = request.headers;
  const accept = headersList['accept'];
  return accept !== 'application/json';
}

function arrayMove<T>(x: T[], from: number, to: number) {
  const maxIndex = x.length - 1;
  x.splice(
    to < 0 ? x.length + to : to > maxIndex ? 0 : to, // Wraps around if exceeds the limits
    0,
    x.splice(from, 1)[0]
  );
}

export function moveToNewArrayPosition<T>(arr: T[], from: number, to: number) {
  const list = arr.slice(0);
  arrayMove(list, from, to);
  return list;
}
