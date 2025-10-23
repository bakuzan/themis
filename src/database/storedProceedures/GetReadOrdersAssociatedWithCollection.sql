SELECT DISTINCT RO.*
  FROM ReadOrder RO
  JOIN ReadOrderIssue ROI ON RO.Id = ROI.ReadOrderId
 WHERE ROI.CollectionId = ?