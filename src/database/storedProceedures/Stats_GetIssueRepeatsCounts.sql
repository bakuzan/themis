WITH RepeatsCounts_CTE AS
(
	SELECT GROUP_CONCAT(ReadHistoryId) ReadHistoryIds
		 , GROUP_CONCAT(DISTINCT CollectionId) CollectionIds
		 , IssueId
		 , COUNT(*) InstanceCount
		 , MAX(ReadOnDate) LastReadDate
	FROM ReadHistoryIssue
	WHERE ReadOnDate IS NOT NULL
	GROUP BY IssueId
)
SELECT ReadHistoryIds
	 , CollectionIds
	 , IssueId
	 , InstanceCount
	 , LastReadDate
	 , Number IssueNumber
	 , IsAnnual
	 , I.Name IssueName
	 , CoverDate IssueCoverDate
	 , TitleId
	 , T.Name TitleName
	 , StartYear TitleStartYear
	 , IsOneShot
  FROM RepeatsCounts_CTE R
  JOIN Issue I				ON R.IssueId = I.Id
  JOIN Title T				ON I.TitleId = T.Id
 ORDER BY InstanceCount DESC, LastReadDate
 LIMIT :limit OFFSET :offset;
  
 