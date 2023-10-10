SELECT strftime('%Y-%m', ReadOnDate) ReadInMonth
     , COUNT(*) IssueCount
  FROM ReadHistoryIssue
 WHERE ReadOnDate IS NOT NULL
 GROUP BY strftime('%Y-%m', ReadOnDate)
 ORDER BY strftime('%Y-%m', ReadOnDate) DESC