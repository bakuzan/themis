SELECT H.*
	 , O.Name ReadOrderName
	 , COUNT(I.ReadOnDate)	  ReadIssueCount
	 , COUNT(I.ReadHistoryId) TotalIssueCount
  FROM ReadHistory H
  JOIN ReadOrder O			ON H.ReadOrderId = O.Id
  JOIN ReadHistoryIssue I	ON H.Id = I.ReadHistoryId
 GROUP BY H.Id