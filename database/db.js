/* INSTANTIATE DATABASE */ 

// Connecting Sequelize
const Sequelize = require('sequelize');
const db = new Sequelize(dbName, dbUser, dbPwd, {
  host: 'localhost',
  dialect: 'postgres'
});
const {dbName, dbUser, dbPwd} = require('./utils/configDB');  // Import database name, username, password

// Display a confirmation message for opening a database connection
console.log('Opening database connection');

// Export Sequelize instance, that will be modified with the models.
module.exports = db;