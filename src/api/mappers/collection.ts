import {
  Collection,
  CollectionViewModel,
  CollectionWithIssueCount,
  CollectionWithIssuesViewModel
} from '@/types/Collection';
import { IssueWithTitleInfo } from '@/types/Issue';

import { toIssueWithTitleInfoViewModel } from './issue';

export function toCollectionViewModel(
  collection: Collection | CollectionWithIssueCount
): CollectionViewModel {
  return {
    id: collection.Id,
    name: collection.Name,
    publicationDate: Number(collection.PublicationDate),
    number: collection.Number,
    issueCount: 'IssueCount' in collection ? collection.IssueCount : null
  };
}

export function toCollectionWithIssuesViewModel(
  collection: Collection,
  issues: IssueWithTitleInfo[]
): CollectionWithIssuesViewModel {
  return {
    id: collection.Id,
    name: collection.Name,
    publicationDate: Number(collection.PublicationDate),
    number: collection.Number,
    issueCount: issues.length,
    issues: issues.map(toIssueWithTitleInfoViewModel)
  };
}
