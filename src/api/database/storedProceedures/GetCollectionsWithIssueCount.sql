   SELECT C.*
        , COUNT(CI.IssueId) IssueCount
     FROM [Collection] C
     JOIN CollectionIssue CI ON C.Id = CI.CollectionId
 GROUP BY C.Id
 ORDER BY C.PublicationDate DESC, C.Name