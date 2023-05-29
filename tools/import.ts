import { ReadOrder, ReadOrderIssue } from './types/ReadOrder';

import db from './database';
import * as Query from './database/queries';

import { debugLog, logError } from './log';
import * as utils from './utils';
import {
  ReadHistory,
  ReadHistoryIssue,
  ReadHistoryIssueWithId
} from './types/ReadHistory';

const argv = process.argv.slice(2);
const isDryRun = argv.includes('--dry');

debugLog(`Starting...`);
debugLog(`Mode: ${isDryRun ? 'dry run' : 'live'}`);

const files = utils.readImportFiles();
debugLog(files);

const logs = [];

// process the each file data
for (const file of files) {
  const rows = file.data.split('\r\n').slice(1); // Skip headers

  const readOrder = db.prepare(Query.GetReadOrder).get(file.name) as ReadOrder;
  if (!readOrder) {
    logs.push(`ReadOrder not found! Nothing matching: ${file.name}`);
    continue;
  }

  const readOrderIssues = db
    .prepare(Query.GetReadOrderIssues)
    .all(readOrder.Id) as ReadOrderIssue[];

  const readHistoryIssues: ReadHistoryIssue[] = readOrderIssues.map((x) => ({
    ReadHistoryId: null,
    CollectionId: x.CollectionId,
    IssueId: x.IssueId,
    SortOrder: x.SortOrder,
    ReadOnDate: null
  }));

  for (const row of rows) {
    const cols = row.match(/(\s*'[^']+'|\s*[^,]+)(?=,|$)/g);
    if (!cols) {
      continue;
    }

    const startDate = utils.convertDateToYYYYMMDD(cols[0]);
    const endDate = utils.convertDateToYYYYMMDD(cols[1]);
    const collectionName = cols[2].trim().toLowerCase();
    const collectionNumber = isNaN(Number(cols[3])) ? null : Number(cols[3]);
    const issueCount = isNaN(Number(cols[4])) ? null : Number(cols[4]);
    const isSingleIssue = issueCount === 1;

    const roi = readOrderIssues.find(
      (roi) =>
        (roi.CollectionName?.trim().toLowerCase() === collectionName &&
          ((!roi.CollectionNumber && !collectionNumber) ||
            roi.CollectionNumber === collectionNumber)) ||
        (isSingleIssue && roi.IssueName.toLowerCase() === collectionName)
    );

    if (!roi) {
      logs.push(`${file.name} :: No match found for: `, cols);
      continue;
    }

    const isCollection = roi.CollectionId !== null;
    const rois = isCollection
      ? readHistoryIssues.filter((x) => x.CollectionId === roi.CollectionId)
      : readHistoryIssues.filter(
          (x) => x.CollectionId === null && x.IssueId === roi.IssueId
        );

    const roiCount = rois.length;
    const dates = utils.calculateDateForEachIssue(roiCount, startDate, endDate);

    for (let i = 0; i < roiCount; i++) {
      const r = rois[i];
      const calculatedDate = dates[i];
      r.ReadOnDate = calculatedDate;
    }
  }

  if (isDryRun) {
    debugLog(readOrder, `${readHistoryIssues.length} issues`);
  } else {
    const insertReadHistory = db.prepare<ReadHistory>(Query.InsertReadHistory);
    const insertReadHistoryIssue = db.prepare<ReadHistoryIssueWithId>(
      Query.InsertReadHistoryIssue
    );

    const importReadHistory = db.transaction(
      (ro: ReadOrder, issues: ReadHistoryIssue[]) => {
        const StartedOnDate = issues[0].ReadOnDate as string;
        const CompletedOnDate = issues[issues.length - 1].ReadOnDate;
        const result = insertReadHistory.run({
          ReadOrderId: ro.Id,
          StartedOnDate,
          CompletedOnDate
        });

        const ReadHistoryId = result.lastInsertRowid as number;
        let sortOrder = 0;

        for (const issue of issues) {
          sortOrder += 5;

          insertReadHistoryIssue.run({
            ...issue,
            SortOrder: sortOrder,
            ReadHistoryId
          });
        }
      }
    );

    importReadHistory(readOrder, readHistoryIssues);
  }

  for (const message of logs) {
    debugLog(message);
  }

  if (!isDryRun) {
    debugLog(`${file.name} import complete.`);
  }
}

debugLog(`Process Complete.`);
