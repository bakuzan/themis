SELECT H.*
	 , O.Name ReadOrderName
  FROM ReadHistory H
  JOIN ReadOrder O		ON H.ReadOrderId = O.Id
 WHERE H.Id = ?