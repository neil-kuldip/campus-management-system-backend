/*==================================================
/database/database/models/Campus.js
It defines the campus model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Define the campus model
const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "../../assets/building_avatar.png"
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING(1234)
  }
});

// Export the campus model
module.exports = Campus;