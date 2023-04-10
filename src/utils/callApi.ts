export default async function callApi<T = any>(
  url: string,
  opts?: RequestInit
): Promise<T> {
  console.log('callApi Request : ', url, opts);

  const response = await fetch(`/api/${url}`, opts);
  const data = await response.json();

  console.log('callApi Response : ', data);

  return data;
}
