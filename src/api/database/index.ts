// eslint-disable-next-line import/no-named-as-default
import Database from 'better-sqlite3';

import { UserVersion } from '@/types/UserVersion';
import setupExecution from './setup';

if (!process.env.DATABASE_PATH) {
  throw new Error('No DATABASE_PATH set.');
}

const db = new Database(process.env.DATABASE_PATH, {});

// Run the scripts against the database
const { user_version } = db.prepare('PRAGMA user_version').get() as UserVersion;
const scripts = setupExecution();

for (const item of scripts) {
  //    Scripts:  N.<file_name>.sql
  // Migration: m_N.<file_name>.sql
  if (!item.migration || item.number >= user_version) {
    db.exec(item.script);
  }
}

// Update the user_version
const finalMigration = scripts
  .filter((x) => x.migration)
  .sort((a, b) => a.number - b.number)
  .pop();

const newUserVersion = (finalMigration?.number ?? 0) + 1;
db.exec(`PRAGMA user_version = ${newUserVersion}`);

export default db;
