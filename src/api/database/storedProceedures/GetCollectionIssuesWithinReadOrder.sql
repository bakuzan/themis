SELECT * 
  FROM ReadOrderIssue 
 WHERE ReadOrderId = @ReadOrderId
   AND CollectionId = @CollectionId
 ORDER BY SortOrder, IssueId