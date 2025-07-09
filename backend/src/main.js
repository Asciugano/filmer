import express from 'express'
import authRoute from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connect_DB } from './lib/db.js';
import { Sequelize } from 'sequelize';

dotenv.config();

const PORT = process.env.PORT;
const app = express()

app.use(express.json());

app.use('/api/auth', authRoute)

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
  connect_DB();
});
