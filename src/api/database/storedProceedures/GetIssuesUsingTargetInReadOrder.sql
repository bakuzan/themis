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
)
   SELECT RI.*
     FROM ReadOrderIssue RI
	   JOIN TargetedRow_CTE TR	ON RI.ReadOrderId = TR.ReadOrderId
LEFT JOIN PriorRow_CTE PR		ON RI.ReadOrderId = PR.ReadOrderId
    WHERE RI.ReadOrderId = @ReadOrderId
	    AND (RI.SortOrder >= TR.SortOrder
		       OR (@IncludePriors = 1
			         AND ((PR.CollectionId IS NOT NULL AND RI.CollectionId = PR.CollectionId)
			              OR (PR.CollectionId IS NULL AND RI.IssueId = PR.IssueId))
			        )
		      )
 ORDER BY SortOrder, IssueId;