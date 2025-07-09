import pkg, { Pool } from 'pg';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.PSQL_DB_NAME,
  process.env.PSQL_USER,
  process.env.PSQL_PASSW,
  {
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

export const connect_DB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Succesfully connnected to PostgreSQL database');

    await sequelize.sync({ alter: true });
    console.log('Succesfully syncronize the tabels');
  } catch (error) {
    console.error(error);
  }
}

export default sequelize;
