const MovieService = require('../services/movie');

const movieService = new MovieService();

class MovieController {
  async getMovies(req, res) {
    const { limit = 10, offset = 0 } = req.query;
    const movies = await movieService.find({ limit, offset });
    res.status(200).json(movies);
  }

  async getAllMovies(req, res) {
    const movies = await movieService.findAll();
    res.status(200).json(movies);
  }

  async createMovie(req, res) {
    const { body } = req;
    const createdMovie = await movieService.create(body);
    res.status(201).json(createdMovie);
  }
}

module.exports = MovieController;
