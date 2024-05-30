const express = require('express');

const MovieService = require('../services/movie');

const router = express.Router();
const movieService = new MovieService();

router.get('/', (req, res) => {
    const { limit = 10, offset = 0 } = req.query;
    const movies = movieService.find({ limit, offset });
    res.json(movies);
});

router.get('/all', (req, res) => {
    const movies = movieService.findAll();
    res.json(movies);
});

router.post('/', (req, res) => {
    const { body } = req;
    const createdMovie = movieService.create(body);
    res.json(createdMovie);
});

module.exports = router;
