SELECT I.Id
	 , Number
	 , I.Name
	 , CoverDate
	 , IsAnnual
	 
	 , TitleId
	 , T.Name TitleName
	 , T.StartYear
	 , IsOneShot

	 , H.ReadOnDate
  FROM ReadHistoryIssue H
  JOIN Issue I 				ON H.IssueId = I.Id
  JOIN Title T				ON I.TitleId = T.Id
 WHERE strftime('%Y-%m', ReadOnDate) = :monthKey
    OR strftime('%Y', ReadOnDate) = :monthKey
 ORDER BY ReadOnDate