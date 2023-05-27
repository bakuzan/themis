// eslint-disable-next-line import/no-named-as-default
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_PATH) {
  throw new Error('No DATABASE_PATH set.');
}

const db = new Database(process.env.DATABASE_PATH, {});

export default db;
