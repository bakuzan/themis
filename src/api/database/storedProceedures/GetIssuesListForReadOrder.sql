    SELECT 
        ri.ReadOrderId,
        ri.SortOrder,
        c.Id CollectionId,
        c.name CollectionName,
        c.Number CollectionNumber,
        c.PublicationDate,
        t.Id TitleId,
        t.Name TitleName,
        t.StartYear,
        t.IsOneShot,
        i.Id IssueId,
        i.Number,
        i.Name,
        i.IsAnnual,
        i.CoverDate
     FROM ReadOrderIssue ri
     JOIN ReadOrder r 			    ON ri.ReadOrderId = r.Id
     JOIN Issue i				    ON ri.IssueId = i.Id
     JOIN Title t 				    ON i.TitleId = t.Id
LEFT JOIN Collection c 			    ON ri.CollectionId = c.Id
LEFT JOIN CollectionIssue ci 	    ON c.Id = ci.CollectionId AND i.Id = ci.IssueId
    WHERE ri.ReadOrderId = ?
 ORDER BY ri.SortOrder, ri.IssueId
