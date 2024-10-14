'use strict';

// Import necessary modules
const fileSystem = require('fs');
const filePath = require('path');
const Sequelize = require('sequelize');
const processEnv = require('process');

// Get the name of the current file (index.js)
const currentFileName = filePath.basename(__filename);

// Get the environment (development by default if not set)
const environment = processEnv.env.NODE_ENV || 'development';

// Load database configuration based on the environment (development, production, etc.)
const dbConfig = require(__dirname + '/../config/config.json')[environment];

// Create an empty object to hold all database models
const database = {};

let sequelizeConnection;
// Check if there's an environment variable for database connection
if (dbConfig.use_env_variable) {
  // Use the environment variable for the connection
  sequelizeConnection = new Sequelize(processEnv.env[dbConfig.use_env_variable], dbConfig);
} else {
  // Otherwise, use the settings from the configuration file
  sequelizeConnection = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

// Read all files in the current directory (where models are located)
fileSystem
  .readdirSync(__dirname)
  .filter(file => {
    // Filter out files that start with a dot, the current file itself, and non-JS files
    return (
      file.indexOf('.') !== 0 && // Not a hidden file
      file !== currentFileName && // Not the current file (index.js)
      file.slice(-3) === '.js' && // Only files ending in .js
      file.indexOf('.test.js') === -1 // Exclude test files
    );
  })
  .forEach(file => {
    // Import each model and add it to the database object
    const model = require(filePath.join(__dirname, file))(sequelizeConnection, Sequelize.DataTypes);
    database[model.name] = model; // Store model in the database object
  });

// Check each model in the database object for associations
Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    // If an association method exists, call it
    database[modelName].associate(database);
  }
});

// Add the sequelize instance and Sequelize library to the database object
database.sequelize = sequelizeConnection;
database.Sequelize = Sequelize;

// Export the database object containing models and sequelize connection
module.exports = database;
