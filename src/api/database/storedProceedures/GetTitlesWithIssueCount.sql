   SELECT T.*
        , COUNT(I.Id) IssueCount
     FROM Title T
LEFT JOIN Issue I ON T.Id = I.TitleId
 GROUP BY T.Id
 ORDER BY T.Name