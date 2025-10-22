export default function getPageTitle(title: string | null | undefined = '') {
  return title ? `${title} | Themis` : 'Themis';
}
