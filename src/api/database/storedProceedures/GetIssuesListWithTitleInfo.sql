SELECT I.*
	 , T.Name TitleName
	 , T.StartYear
	 , T.IsOneShot
  FROM Issue I
  JOIN Title T 				ON I.TitleId = T.Id
 ORDER BY T.Name
        , T.StartYear
        , CoverDate DESC
        , Number DESC