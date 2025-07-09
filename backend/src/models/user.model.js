import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.PSQL_DB_NAME,
  process.env.PSQL_USER,
  process.env.PSQL_PASSW,
  {
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    dialect: 'postgres',
    logging: true,
  }
);

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  full_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [6, 255],
    },
  },
});

export default User;
