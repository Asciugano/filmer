import express from 'express'
import fimlRoute from './routes/watch.route.js';
import authRoute from './routes/auth.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connect_DB } from './lib/db.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express()

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/watch', fimlRoute);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
  connect_DB();
});
