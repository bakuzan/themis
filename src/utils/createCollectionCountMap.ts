type CollectionGroupable = {
  collectionId: number | null;
};

export default function createCollectionCountMap(
  readOrderIssues: CollectionGroupable[]
) {
  return readOrderIssues.reduce(
    (p, c) => p.set(c.collectionId, (p.get(c.collectionId) ?? 0) + 1),
    new Map<number | null, number>([])
  );
}
