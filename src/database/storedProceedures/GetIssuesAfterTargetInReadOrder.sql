WITH TargetedRow_CTE AS
(
   SELECT *
     FROM ReadOrderIssue
    WHERE ReadOrderId = @ReadOrderId
	  AND (@CollectionId IS NULL OR CollectionId = @CollectionId)
	  AND IssueId = @IssueId
)
   SELECT RI.*
     FROM ReadOrderIssue RI
	 JOIN TargetedRow_CTE TR	ON RI.ReadOrderId = TR.ReadOrderId
    WHERE RI.ReadOrderId = @ReadOrderId
	  AND RI.SortOrder >= TR.SortOrder
 ORDER BY SortOrder, IssueId;