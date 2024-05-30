const { Sequelize } = require('sequelize');
const dbConfiguration = require('./../db/config');
const { setupModels } = require('../db/models');


const sequelize = new Sequelize(
  dbConfiguration.url,
  dbConfiguration.config);

setupModels(sequelize);

module.exports = sequelize;
