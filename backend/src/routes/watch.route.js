import express from 'express';
import { getMoviesByGenre, getMoviesByPlatform } from '../controllers/watch.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/getByPlatform', protectRoute, getMoviesByPlatform);
router.post('/getByGenre', protectRoute, getMoviesByGenre);

export default router;
