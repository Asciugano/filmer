import JustWatch from "justwatch-api";

const justwatch = new JustWatch({ locale: 'it_IT' });

export const getMoviesByPlatform = async (req, res) => {
  let { platforms, content_types } = req.body;

  try {
    if (!platforms || !Array.isArray(platforms) || platforms.length === 0)
      return res.status(400).json({ message: 'You must specify at least 1 straming platform' });
    if (!content_types) {
      content_types = ['movie'];
    }

    const data = await justwatch.search({
      providers: platforms,
      content_types: content_types,
      page_size: 20,
      page: 1,
    });

    res.status(200).json({
      results: data.items.map(film => ({
        title: film.title,
        poster: film.poster,
        provider: film.offers?.[0]?.provider_id,
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
    if (!content_types)
      content_types = ['movie'];
    if (!genres || !Array.isArray(genres) || genres.length === 0)
      return res.status(400).json({ message: 'You must specify at least 1 genre' });

    const data = await justwatch.search({
      providers: platforms,
      content_types: content_types,
      genres: genres,
      page_size: 20,
      page: 1,
    });

    res.status(200).json({
      results: data.items.map(item => ({
        title: item.title,
        poster: item.poster,
        provider: item.offers?.[0]?.provider_id ?? null,
      }))
    });
  } catch (e) {
    console.log('Error in getMoviesByGenre', e.message);
    res.status(500).json({ message: 'Internal Server Error', error: e.message });
  }
}
