import {
  AddReadOrderIssuesRequest,
  ReadOrderIssue
} from '@/types/ReadOrderIssue';

export default function calculateNewReadOrderIssueSortOrder(
  data: AddReadOrderIssuesRequest,
  items: ReadOrderIssue[]
) {
  if (data.BeforeReadOrderIssue) {
    // TODO
    // Get all issues from the first issue in the sort order that matches the props to the end
    // Get the lowest sort order
    // Prepend the items array
    // Set all sort orders based on that lowest value +X
  } else {
    // TODO
    // Get the last issue in the sort order
    // Set items sort orders based on that value +X
  }
}
