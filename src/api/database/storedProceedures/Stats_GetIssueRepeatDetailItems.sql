SELECT ReadHistoryId
	 , O.Name ReadOrderName
	 , ReadOnDate

	 , CollectionId
	 , C.Name CollectionName
	 , C.Number CollectionNumber
	 , C.PublicationDate

	 , IssueId
  FROM ReadHistoryIssue R
  JOIN ReadHistory H		ON R.ReadHistoryId = H.Id
  JOIN ReadOrder O			ON H.ReadOrderId = O.Id
  JOIN Collection C		    ON R.CollectionId = C.Id
  JOIN Issue I				ON R.IssueId = I.Id
  JOIN Title T				ON I.TitleId = T.Id
 WHERE IssueId = :issueId
   AND ReadOnDate IS NOT NULL
 ORDER BY ReadOnDate DESC
  
 