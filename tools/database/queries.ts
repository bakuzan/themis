// Reads

export const GetReadOrder = `
    SELECT *
      FROM ReadOrder
     WHERE Name = ?
`;

export const GetReadOrderIssues = `
    SELECT ROI.*
         , C.Name CollectionName
         , C.Number CollectionNumber
         , I.Name IssueName
      FROM ReadOrderIssue ROI
 LEFT JOIN Collection C			ON ROI.CollectionId = C.Id
      JOIN Issue I				ON ROI.IssueId = I.Id
     WHERE ReadOrderId = ?
     ORDER BY ROI.SortOrder, ROI.IssueId
`;

// Writes
export const InsertReadHistory = `
     INSERT INTO ReadHistory(ReadOrderId, StartedOnDate, CompletedOnDate)
     VALUES (@ReadOrderId, @StartedOnDate, @CompletedOnDate)
`;

export const InsertReadHistoryIssue = `
     INSERT INTO ReadHistoryIssue(ReadHistoryId, IssueId, CollectionId, SortOrder, ReadOnDate)
     VALUES (@ReadHistoryId, @IssueId, @CollectionId, @SortOrder, @ReadOnDate)
`;
