   SELECT I.*
        , T.Name TitleName
        , T.StartYear
        , T.IsOneShot
     FROM Issue I
     JOIN Title T 				 ON I.TitleId = T.Id
LEFT JOIN CollectionIssue CI     ON I.Id = CI.IssueId
    WHERE CI.CollectionId IS NULL
 ORDER BY T.Name
        , T.StartYear
        , CoverDate 
        , Number