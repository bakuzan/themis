import db from './database';

import { Title, TitleViewModel } from '@/types/Title';

function toViewModel(title: Title): TitleViewModel {
  return {
    id: title.Id,
    name: title.Name,
    startYear: title.StartYear,
    isOneShot: title.IsOneShot === 1
  };
}

export function getTitles() {
  // TODO Return an issue count
  const titles = db.prepare(`SELECT * FROM Title`).all() as Title[];

  return titles.map(toViewModel);
}

export function getTitleById(id: number) {
  // TODO return issues list
  const title = db.prepare(`SELECT * FROM Title WHERE Id = ?`).get(id) as Title;

  return toViewModel(title);
}
