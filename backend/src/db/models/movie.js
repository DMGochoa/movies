const { Model, DataTypes } = require('sequelize');

const MOVIE_TABLE = 'movies';

const MovieSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'release_year',
  },
  rateAverage: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'rate_average',
  },
  voteCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    field: 'vote_count',
  }
};

class Movie extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: 'Movie',
      timestamps: false,
    }
  }
};

module.exports = { Movie, MovieSchema, MOVIE_TABLE };
