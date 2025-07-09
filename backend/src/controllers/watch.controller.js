import axios from "axios";
import dotenv from "dotenv";
import { response } from "express";

dotenv.config();

const IMAGE_BASE_URL = 'https://images.justwatch.com';

export const getMoviesByPlatform = async (req, res) => {
  let { platforms, content_types } = req.body;

  try {
    if (!platforms || !Array.isArray(platforms) || platforms.length === 0)
      return res.status(400).json({ message: 'You must specify at least 1 straming platform' });

    const response = await axios.get('https://imdb236.p.rapidapi.com/api/imdb/search', {
      params: {
        type: content_types || 'movie',
        rows: '25',
        sortOrder: 'ASC',
        sortField: 'id',
      },
      headers: {
        'x-rapidai-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
      }
    });

    res.status(200).json({
      results: response.data.map(item => ({
        primaryTitle: item.primaryTitle,
        description: item.description,
        primaruImage: item.primaruImage,
      }))
    });
  } catch (e) {
    console.log('Error in getMoviesByPlatform', e.message);
    res.status(500).json({ message: 'Internal Server Error', error: e.message });
  }
}

export const getMoviesByGenre = async (req, res) => {
  let { platforms, genres, content_types } = req.body;

  try {
    if (!platforms || !Array.isArray(platforms) || platforms.length === 0)
      return res.status(400).json({ message: 'You must specify at least 1 straming platform' });
    if (!genres || !Array.isArray(genres) || genres.length === 0)
      return res.status(400).json({ message: 'You must specify at least 1 genre' });

    const response = await axios.get('https://imdb236.p.rapidapi.com/api/imdb/search', {
      params: {
        type: content_types || 'movie',
        genres: genres,
        rows: '25',
        sortOrder: 'ASC',
        sortField: 'id',
      },
      headers: {
        'x-rapidai-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
      }
    });

    res.status(200).json({
      results: response.data.map(item => ({
        primaryTitle: item.primaryTitle,
        description: item.description,
        primaruImage: item.primaruImage,
      }))
    });
  } catch (e) {
    console.log('Error in getMoviesByGenre', e.message);
    res.status(500).json({ message: 'Internal Server Error', error: e.message });
  }
}
