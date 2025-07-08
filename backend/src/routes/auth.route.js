import express from 'express'

const router = express.Router()

router.post('/singup', (req, res) => {
  res.send('singup');
});

router.post('/login', (req, res) => {
  res.send('login');
});

router.post('/check-auth', (req, res) => {
  res.send('check-auth');
});

router.get('/logout', (req, res) => {
  res.send('logout');
});

export default router;
