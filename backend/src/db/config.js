const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.dbms}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const dbConfiguration = {
  dev: {
    url: URI,
    config :{
      dialect: 'postgres',
      logging: true,
    }
  },
  prod: {
    url: URI,
    config :{
      dialect: 'postgres',
      logging: false,
    }
  },
}

module.exports = dbConfiguration[config.env]
