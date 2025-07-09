import dotenv from 'dotenv';
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

dotenv.config();


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
