CREATE UNIQUE INDEX IF NOT EXISTS "Title_Unique_Columns" ON "Title" ("Name", "StartYear", "IsOneShot");
CREATE UNIQUE INDEX IF NOT EXISTS "Issue_Unique_Columns" ON "Issue" ("Number", "IsAnnual", "TitleId");
CREATE INDEX IF NOT EXISTS "Issue_TitleId_Index" ON "Issue" ("TitleId");
CREATE UNIQUE INDEX IF NOT EXISTS "Collection_Unique_Columns" ON "Collection" ("Name", "PublicationDate", "Number");
CREATE INDEX IF NOT EXISTS "CollectionIssue_CollectionId_Index" ON "CollectionIssue" ("CollectionId");
CREATE INDEX IF NOT EXISTS "CollectionIssue_IssueId_Index" ON "CollectionIssue" ("IssueId");
CREATE UNIQUE INDEX IF NOT EXISTS "CollectionIssue_IssueId_CollectionId_Index" ON "CollectionIssue" ("IssueId", "CollectionId");
CREATE UNIQUE INDEX IF NOT EXISTS "ReadOrder_Name_Index" ON "ReadOrder" ("Name");
CREATE INDEX IF NOT EXISTS "ReadOrderIssue_CollectionId_Index" ON "ReadOrderIssue" ("CollectionId");
CREATE INDEX IF NOT EXISTS "ReadOrderIssue_IssueId_Index" ON "ReadOrderIssue" ("IssueId");
CREATE INDEX IF NOT EXISTS "ReadOrderIssue_ReadOrdeId_Index" ON "ReadOrderIssue" ("ReadOrderId");
CREATE UNIQUE INDEX IF NOT EXISTS "ReadOrderIssue_Unique_Columns" ON "ReadOrderIssue" ("ReadOrderId", "CollectionId", "IssueId");