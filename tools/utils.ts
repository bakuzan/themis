import fs from 'fs';
import path from 'path';

import { logError } from './log';
import { ImportFile } from './types/Import';

const targetFolder = path.join(process.cwd(), 'tools/input');

export function readImportFiles(): ImportFile[] {
  try {
    const filenames = fs.readdirSync(targetFolder);

    return filenames
      .filter((x) => x.endsWith('csv'))
      .map((filename) => {
        const nameParts = filename.split('.');
        const content = fs.readFileSync(
          path.join(targetFolder, filename),
          'utf-8'
        );

        return {
          name: nameParts[0],
          ext: nameParts[1],
          data: content.toString()
        };
      });
  } catch (err) {
    logError(err);
    throw new Error(`Failed to read csv files`);
  }
}

const monthNameToNumber = new Map([
  ['January', '01'],
  ['February', '02'],
  ['March', '03'],
  ['April', '04'],
  ['May', '05'],
  ['June', '06'],
  ['July', '07'],
  ['August', '08'],
  ['September', '09'],
  ['October', '10'],
  ['November', '11'],
  ['December', '12']
]);

export function convertDateToYYYYMMDD(dd_MMMM_YYYY: string) {
  const parts = dd_MMMM_YYYY.split(' ').reverse();
  const month = monthNameToNumber.get(parts[1]);
  return `${parts[0]}-${month}-${parts[2].padStart(2, '0')}`;
}

function getAllDatesFromStartToEnd(d1: string, d2: string) {
  const start = new Date(d1);
  const end = new Date(d2);
  const endTime = end.getTime();

  let curr = new Date(start);
  const dates = [];

  while (curr.getTime() < endTime) {
    dates.push(curr.toISOString().split('T')[0]);
    curr.setDate(curr.getDate() + 1);
  }

  return [...dates, curr.toISOString().split('T')[0]];
}

export function calculateDateForEachIssue(
  issueCount: number,
  d1: string,
  d2: string
) {
  const dateList = [];
  const dates = getAllDatesFromStartToEnd(d1, d2);
  const diff = dates.length;
  let issuesPerDay = Math.ceil(issueCount / diff);
  let issues = 0;

  for (let i = 0; i < dates.length; i++) {
    const d = dates[i];
    dateList.push(...Array(issuesPerDay).fill(d));
    issues += issuesPerDay;
    issuesPerDay = Math.ceil((issueCount - issues) / (diff - i - 1));
  }

  return dateList;
}
