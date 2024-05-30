const express = require('express');

const validatorHandler = require('../middlewares/validatorHandler');
const { createMovieSchema, updateRatingSchema } = require('../schemas/movie');
const MovieController = require('../controllers/movie');

const router = express.Router();
const movieController = new MovieController();

router.get('/', movieController.getMovies);

router.get('/all', movieController.getAllMovies);

router.post('/',
  validatorHandler(createMovieSchema, 'body'),
  movieController.createMovie);

router.post('/:id/ratings',
  validatorHandler(updateRatingSchema, 'body'),
  movieController.createRating);

module.exports = router;
