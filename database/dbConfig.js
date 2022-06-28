const { Sequelize } = require('sequelize');
const envConfig = {
  path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
};
require("dotenv").config(envConfig);

const sequelize = new Sequelize(process.env.CONNECTION_URI, {
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
  }
}) 



sequelize
  .authenticate()
  .then(() => {
    console.log('Connected To PostgreSQL Succesfully !');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize
