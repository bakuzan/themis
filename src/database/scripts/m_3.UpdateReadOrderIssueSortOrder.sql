UPDATE ReadOrderIssue
   SET SortOrder = T.CollectionIssueNumber * 5
  FROM (SELECT ROV.ReadOrderId
			 , ROV.CollectionId
			 , ROV.IssueId
			 , row_number() OVER (PARTITION BY ROV.ReadOrderId 
									  ORDER BY ROV.SortOrder, ROV.IssueId) CollectionIssueNumber
		FROM ReadOrderView ROV	
       ORDER BY ROV.ReadOrderId, ROV.SortOrder) T 
 WHERE ReadOrderIssue.ReadOrderId = T.ReadOrderId
   AND (ReadOrderIssue.CollectionId = T.CollectionId OR T.CollectionId IS NULL)
   AND ReadOrderIssue.IssueId = T.IssueId;