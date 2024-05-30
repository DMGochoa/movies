const { faker  } = require('@faker-js/faker');
const { boom } = require('@hapi/boom');

class MovieService {
    constructor() {
      this.movies = [];
      this.generateMovies();
      this.lastId = this.movies.length;
    }

    generateMovies() {
      for (let i = 0; i < 20; i++) {
        this.movies.push({
            id: i+1,
            title: faker.word.words(
                { count: { min: 1, max: 5 } }
                ),
            category: faker.commerce.department(),
            releaseYear: faker.date.past({ years: 40}).getFullYear(),
            rateAverage: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
            voteCount: faker.number.int({ min: 1, max: 1000 }),
        });
      }
    }

    find(query) {
      const limit = parseInt(query.limit);
      const offset = parseInt(query.offset);
      const queriedMovies = this.movies.slice(offset, offset + limit);
      return queriedMovies
    }

    findAll() {
      return this.movies;
    }

    create(data) {
      const newMovie = { id: this.lastId + 1, voteCount: 1, ...data };
      this.movies.push(newMovie);
      return newMovie
    }

    findById(id) {
      const movieId = parseInt(id);
      if (!movieId) {
        throw boom.notFound('The requested movie ID does not exist.');
      }
      return this.movies.find(movie => movie.id === movieId);
    }

    updateRating(id, rating) {
      const movie = this.findById(id);

      movie.rateAverage = parseFloat(
        ((movie.rateAverage * movie.voteCount + rating) / (movie.voteCount + 1)).toFixed(1)
        );
      movie.voteCount++;
      return movie;
    }
}

module.exports = MovieService;
