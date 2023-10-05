// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('defaultdb', 'doadmin', 'AVNS_KMLVt6M54LboBq76Xwo', {
  host: 'db-postgresql-nyc3-00829-do-user-14229353-0.b.db.ondigitalocean.com',
  port: 25060,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Configuración necesaria para conexiones SSL en DigitalOcean
    }
  },
});

module.exports = sequelize;
