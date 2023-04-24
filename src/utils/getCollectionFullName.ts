import { CollectionViewModel } from '@/types/Collection';
import { IssueWithReadOrderInfoViewModel } from '@/types/Issue';

type CollectionLike = Partial<
  Pick<CollectionViewModel, 'name' | 'number' | 'publicationDate'> &
    Pick<IssueWithReadOrderInfoViewModel, 'collectionName' | 'collectionNumber'>
>;

export default function getCollectionFullName(
  col: CollectionLike,
  includePublicationDate = false
) {
  const name = col.collectionName ?? col.name;
  const num = col.collectionNumber ?? col.number;
  if (!name) {
    return null;
  }

  const vol = num ? ` Vol. ${num}` : '';
  return `${name}${vol}${
    includePublicationDate ? ` (${col.publicationDate})` : ''
  }`;
}
