const { faker  } = require('@faker-js/faker')

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
      const newMovie = { id: this.lastId + 1, ...data };
      this.movies.push(newMovie);
      return newMovie
    }
}

module.exports = MovieService;
