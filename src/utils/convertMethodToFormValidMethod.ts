export default function convertMethodToFormValidMethod(method: string) {
  return method === 'GET' ? 'GET' : 'POST';
}
