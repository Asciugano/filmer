import express from 'express'
import { checkAuth, login, logout, signup } from '../controllers/auth.controller.js';

const router = express.Router()

router.post('/singup', signup);

router.post('/login', login);

router.get('/check-auth', checkAuth);

router.post('/logout', logout);

export default router;
