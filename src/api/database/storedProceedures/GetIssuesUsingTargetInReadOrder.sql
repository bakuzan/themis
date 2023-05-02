WITH TargetedRow_CTE AS
(
   SELECT *
     FROM ReadOrderIssue
    WHERE ReadOrderId = @ReadOrderId
	  AND (CollectionId = @CollectionId OR IssueId = @IssueId)
 ORDER BY SortOrder, IssueId
	  LIMIT 1
),
PriorRow_CTE AS
(
   SELECT RI.*
     FROM ReadOrderIssue RI
	   JOIN TargetedRow_CTE TR	ON RI.ReadOrderId = TR.ReadOrderId
    WHERE RI.ReadOrderId = @ReadOrderId
	    AND RI.SortOrder < TR.SortOrder
 ORDER BY SortOrder DESC, IssueId DESC
    LIMIT 1
),
NextRow_CTE AS
(
   SELECT RI.*
     FROM ReadOrderIssue RI
	 JOIN TargetedRow_CTE TR	ON RI.ReadOrderId = TR.ReadOrderId
    WHERE RI.ReadOrderId = @ReadOrderId
	  AND RI.SortOrder > TR.SortOrder
 ORDER BY SortOrder, IssueId
    LIMIT 1
)
   SELECT RI.*
     FROM ReadOrderIssue RI
	 JOIN TargetedRow_CTE TR	ON RI.ReadOrderId = TR.ReadOrderId
LEFT JOIN PriorRow_CTE PR		ON RI.ReadOrderId = PR.ReadOrderId
LEFT JOIN NextRow_CTE NR		ON RI.ReadOrderId = NR.ReadOrderId
    WHERE RI.ReadOrderId = @ReadOrderId
	  AND ((RI.CollectionId = TR.CollectionId OR RI.IssueId = TR.IssueId)
		    OR (@IncludePriors = 0
			    AND ((NR.CollectionId IS NOT NULL AND RI.CollectionId = NR.CollectionId)
			            OR (NR.CollectionId IS NULL AND RI.IssueId = NR.IssueId))
			    )
		    OR (@IncludePriors = 1
			    AND ((PR.CollectionId IS NOT NULL AND RI.CollectionId = PR.CollectionId)
			            OR (PR.CollectionId IS NULL AND RI.IssueId = PR.IssueId))
			    )
		    )
 ORDER BY SortOrder, IssueId;