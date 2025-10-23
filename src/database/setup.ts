import path from 'path';
import fs from 'fs';

const targetFolder = path.join(process.cwd(), 'src/database/scripts');

export function readSQLFiles() {
  try {
    const filenames = fs.readdirSync(targetFolder);

    return filenames
      .filter((x) => x.endsWith('sql'))
      .map((filename) => {
        const prefix = filename.split('.')[0];
        const content = fs.readFileSync(
          path.join(targetFolder, filename),
          'utf-8'
        );

        return {
          number: Number(prefix.replace('m_', '')),
          name: filename,
          script: content.toString(),
          migration: prefix.includes('m_')
        };
      });
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to read SQL files`);
  }
}

export default function setupExecution() {
  return readSQLFiles().sort((a, b) => {
    if (a.migration === b.migration) {
      return a.number - b.number;
    } else {
      return a.migration ? 0 : -1;
    }
  });
}
