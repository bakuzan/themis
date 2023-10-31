type CollectionLike = {
  number?: number | null | undefined;
  name?: string | undefined;
  publicationDate?: number | undefined;
  collectionName?: string | undefined;
  collectionNumber?: number | null | undefined;
};

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
