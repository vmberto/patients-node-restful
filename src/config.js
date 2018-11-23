const Sequelize = require('sequelize');

const db = 'heroku_dbdcf546afa7aeb'
const username = 'ba457ca43c12d1'
const password = '48eee4ad'

sequelize = new Sequelize(db, username, password, {
  host: 'us-cdbr-iron-east-01.cleardb.net',
  dialect: 'mysql',
  operatorsAliases: false,

  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize.authenticate()

module.exports = sequelize;