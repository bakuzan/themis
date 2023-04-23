import { CollectionViewModel } from '@/types/Collection';
import { IssueWithReadOrderInfoViewModel } from '@/types/Issue';

type CollectionLike = Partial<
  Pick<CollectionViewModel, 'name' | 'number'> &
    Pick<IssueWithReadOrderInfoViewModel, 'collectionName' | 'collectionNumber'>
>;

export default function getCollectionFullName(col: CollectionLike) {
  const name = col.name || col.collectionName;
  const num = col.number || col.collectionNumber;
  if (!name) {
    return null;
  }

  const vol = num ? ` Vol. ${num}` : '';
  return `${name}${vol}`;
}
