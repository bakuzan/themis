UPDATE CollectionIssue
   SET SortOrder = T.CollectionIssueNumber * 5
  FROM (SELECT ROV.ReadOrderId
			 , CI.CollectionId
			 , CI.IssueId
			 , row_number() OVER (PARTITION BY ROV.ReadOrderId, CI.CollectionId 
                                      ORDER BY ROV.SortOrder) CollectionIssueNumber
		FROM ReadOrderView ROV	
        JOIN CollectionIssue CI	ON CI.CollectionId = ROV.CollectionId AND CI.IssueId = ROV.IssueId
        ORDER BY ROV.ReadOrderId, ROV.SortOrder) T 
 WHERE CollectionIssue.CollectionId = T.CollectionId 
   AND CollectionIssue.IssueId = T.IssueId;