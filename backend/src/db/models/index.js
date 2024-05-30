const { Movie, MovieSchema } = require('./movie');

function setupModels(sequelize) {
  Movie.init(MovieSchema, Movie.config(sequelize));
}

module.exports = { setupModels };
