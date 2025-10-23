CREATE TABLE IF NOT EXISTS "ReadHistoryIssue" (
    "ReadHistoryId" INTEGER NOT NULL,
	"IssueId"	    INTEGER NOT NULL,
	"CollectionId"	INTEGER,
	"SortOrder"	    INTEGER NOT NULL,
    "ReadOnDate"    TEXT,
	FOREIGN KEY("ReadHistoryId") REFERENCES "ReadHistory"("Id"),
	FOREIGN KEY("CollectionId") REFERENCES "Collection"("Id"),
	FOREIGN KEY("IssueId") REFERENCES "Issue"("Id"),
	UNIQUE("ReadHistoryId","CollectionId","IssueId")
)