type EntityLike = { id: number };

export function exclude<T extends EntityLike>(items: T[], ids: number[]) {
  return items.filter((x) => !ids.some((y) => y === x.id));
}
