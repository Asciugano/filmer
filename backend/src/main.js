import express from 'express'
import authRoute from './routes/auth.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const PORT = process.env.PORT;

app.use('/api/auth', authRoute)

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
