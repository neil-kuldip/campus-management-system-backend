const db = require('./db');  // Database instance

require('../database/models');  // Export models

module.exports = db;  // Export database instance