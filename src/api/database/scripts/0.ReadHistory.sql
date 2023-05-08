CREATE TABLE IF NOT EXISTS "ReadHistory" (
	"Id"	        	INTEGER NOT NULL UNIQUE,
    "ReadOrderId"   	INTEGER NOT NULL,
	"StartedOnDate"		TEXT NOT NULL DEFAULT CURRENT_DATE,
	"CompletedOnDate"	TEXT,
	PRIMARY KEY("Id" AUTOINCREMENT),
    FOREIGN KEY("ReadOrderId") REFERENCES "ReadOrder"("Id"),
	UNIQUE("ReadOrderId","StartedOnDate")
)