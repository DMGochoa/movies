const MovieService = require('../services/movie');

const movieService = new MovieService();

class MovieController {
  async getMovies(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const movies = await movieService.find({ limit, offset });
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  async getAllMovies(req, res, next) {
    try {
      const movies = await movieService.findAll();
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  async createMovie(req, res, next) {
    try {
      const { body } = req;
      const createdMovie = await movieService.create(body);
      res.status(201).json(createdMovie);
    } catch (error) {
      next(error);
    }
  }

  async createRating(req, res, next) {
    try {
      const { body } = req;
      const { id } = req.params;
      const updatedMovie = await movieService.updateRating(id, body.value);
      res.status(200).json(updatedMovie);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
