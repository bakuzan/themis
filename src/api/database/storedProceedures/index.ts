import path from 'path';
import fs from 'fs';

type StoredProceedures = '';

const proceedures = {} as Record<StoredProceedures, string>;
const targetFolder = path.join(
  process.cwd(),
  'src/api/database/storedProceedures'
);

function readSQLFiles() {
  try {
    const filenames = fs.readdirSync(targetFolder);

    return filenames
      .filter((x) => x.endsWith('sql'))
      .map((filename) => {
        const key = filename.replace('.sql', '') as StoredProceedures;
        const content = fs
          .readFileSync(path.join(targetFolder, filename), 'utf-8')
          .toString();

        proceedures[key] = content;
      });
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to read SQL files`);
  }
}

export default function getStoredProceedure(proceedureName: StoredProceedures) {
  const script = proceedures[proceedureName];
  if (!script) {
    readSQLFiles();
  }

  return proceedures[proceedureName];
}
