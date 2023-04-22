   SELECT R.*
        , COUNT(I.IssueId) IssueCount
     FROM ReadOrder R
LEFT JOIN ReadOrderIssue I ON R.Id = I.ReadOrderId
 GROUP BY R.Id
 ORDER BY R.Name