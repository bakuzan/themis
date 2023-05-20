   SELECT C.*
        , COUNT(CI.IssueId) IssueCount
     FROM [Collection] C
LEFT JOIN CollectionIssue CI ON C.Id = CI.CollectionId
 GROUP BY C.Id
 ORDER BY C.Name, C.PublicationDate, C.Number