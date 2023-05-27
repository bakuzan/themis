import { ReadOrder, ReadOrderIssue } from './types/ReadOrder';

import db from './database';
import * as Query from './database/queries';

import { debugLog, logError } from './log';
import * as utils from './utils';
import { ReadHistoryIssue } from './types/ReadHistory';

const argv = process.argv.slice(2);
const isDryRun = argv.includes('--dry');

debugLog(`\r\nStarting...`);
debugLog(`\r\n Mode: ${isDryRun ? 'dry run' : 'live'}`);

const files = utils.readImportFiles();
debugLog(files);

// process the each file data
for (const file of files) {
  const rows = file.data.split('\r\n').slice(1); // Skip headers

  const readOrder = db.prepare(Query.GetReadOrder).get(file.name) as ReadOrder;
  if (!readOrder) {
    logError(`ReadOrder not found! Nothing matching: ${file.name}`);
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
    const collectionName = cols[2].trim();
    const collectionNumber = isNaN(Number(cols[3])) ? null : Number(cols[3]);
    const issueCount = isNaN(Number(cols[4])) ? null : Number(cols[4]);
    const isSingleIssue = issueCount === 1;

    const roi = readOrderIssues.find(
      (roi) =>
        (roi.CollectionName === collectionName &&
          ((!roi.CollectionNumber && !collectionNumber) ||
            roi.CollectionNumber === collectionNumber)) ||
        (isSingleIssue && roi.IssueName === collectionName)
    );

    if (!roi) {
      debugLog(`No match found for: `, cols);
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
    debugLog(cols, roiCount, dates);

    for (let i = 0; i < roiCount; i++) {
      const r = rois[i];
      const calculatedDate = dates[i];
      r.ReadOnDate = calculatedDate;
    }
  }

  debugLog(readOrder, readHistoryIssues);
  // TODO
  // print nice for dry run
  // else
  // TODO
  // create readhistory
  // create readhistoryissues
}
