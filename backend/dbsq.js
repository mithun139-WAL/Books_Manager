const Sequelize = require('sequelize');

const db = new Sequelize('westsidenode', 'root', 'Mithun@iiito1', {
  host: 'loclhost',
  dialect: 'mysql',
});

module.exports = db;
