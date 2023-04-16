SELECT I.*
	 , T.Name TitleName
	 , T.StartYear
	 , T.IsOneShot
  FROM Issue I
  JOIN Title T 				ON I.TitleId = T.Id
  JOIN CollectionIssue CI 	ON I.Id = CI.IssueId
 WHERE CI.CollectionId = ?