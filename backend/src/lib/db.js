import pkg, { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const connect_DB = async () => {
  try {
    const { Client } = pkg;

    const client = new Client({
      host: process.env.PSQL_HOST,
      port: process.env.PSQL_PORT,
      user: process.env.PSQL_USER,
      password: process.env.PSQL_PASSW,
      database: process.env.PSQL_DB_NAME,
    });

    await client.connect();
  } catch (error) {
    console.error(error);
  }
}
