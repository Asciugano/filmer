import pkg, { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

export const connect_DB = async () => {
  try {
    const client = new Client({
      host: process.env.PSQL_HOST,
      port: process.env.PSQL_PORT,
      user: process.env.PSQL_USER,
      password: process.env.PSQL_PASSW,
      database: process.env.PSQL_DB_NAME,
    });

    await client.connect();
    console.log('Succesfully connnected to PostgreSQL database')
  } catch (error) {
    console.error(error);
  }
}
