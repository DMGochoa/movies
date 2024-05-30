const { boom } = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class MovieService {
    async find(query) {
      const limit = parseInt(query.limit);
      const offset = parseInt(query.offset);
      const queriedMovies = await models.Movie.findAll(
        {
          limit,
          offset,
        }
      )
      return queriedMovies
    }

    async findAll() {
      const movies = await models.Movie.findAll();
      return movies;
    }

    async create(data) {
      console.log(data)
      const newMovie = await models.Movie.create(data);
      return newMovie
    }

    async findById(id) {
      const movie = await models.Movie.findByPk(id);
      if (!movie) {
        throw boom.notFound('The requested movie ID does not exist.');
      }
      return movie;
    }

    async updateRating(id, rating) {
      const oldData = await this.findById(id);
      const newRateAverage = parseFloat(
        ((oldData.rateAverage * oldData.voteCount + rating) / (oldData.voteCount + 1)).toFixed(1)
        );
      const newVoteCount = oldData.voteCount + 1;
      const updatedMovie = await oldData.update({
        rateAverage: newRateAverage,
        voteCount: newVoteCount,
      });
      return updatedMovie;
    }
}

module.exports = MovieService;
