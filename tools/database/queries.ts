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
