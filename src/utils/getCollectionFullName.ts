import { CollectionViewModel } from '@/types/Collection';

export default function getCollectionFullName(col: CollectionViewModel) {
  const vol = col.number ? ` Vol. ${col.number}` : '';
  return `${col.name}${vol}`;
}
