   SELECT *
     FROM ReadOrderIssue
    WHERE ReadOrderId = ?
 ORDER BY SortOrder DESC, IssueId DESC
    LIMIT 1
