/*==================================================
/app.js

This is the top-level (main) file for the server application.
It is the first file to be called when starting the server application.
It initiates all required parts of server application such as Express, routes, database, etc.  
==================================================*/
/* SET UP DATABASE */
// Import database setup utilities
const createDB = require('./database/utils/createDB');  // Import function to create database
const seedDB = require('./database/utils/seedDB');  // Import function to seed database
// Import database instance for database connection (including database name, username, and password)
const db = require('./database');

const cors = require('cors');
/* MODEL SYNCHRONIZATION & DATABASE SEEDING */
// Set up sync and seed process
const syncDatabase = async () => {
  try {
    // Model Synchronization:
    // - Make a connection between the Node.js application (this server app) and the Postgres database application.
    // - Create new tables (according to the models) in the Postgres database application, dropping tables first if they already existed
    await db.sync({force: true});
    console.log('------Synced to db--------')
    // Database Seeding
    await seedDB();  
    console.log('--------Successfully seeded db--------');
  } 
  catch (err) {
    console.error('syncDB error:', err);
  }  
}

/* SET UP EXPRESS APPLICATION */
// Import Express application
const express = require("express");
// Create an Express application called "app"
const app = express();

/* SET UP ROUTES */
// Import sub-routes and associated router functions
const apiRouter = require('./routes/index');

/* CONFIGURE EXPRESS APPLICATION */
// Create a function to configure the Express application
const configureApp = async () => {
  app.use(cors());
  // Middleware to handle request data and response
  app.use(express.json());  // Set up Express to parse JSON requests and generate JSON responses
  app.use(express.urlencoded({ extended: false }));  // Express to parse requests encoded in URL format and querystring

  // Set up the Express application's main top-level route and attach all sub-routes to it
  app.use("/api", apiRouter);  // Add main top-level URL path "/api" before sub-routes
  app.get("/", (req, res) => {
    res.status(200).json(
      [
        "Welcome to the Campus Management System", 
        { "Usage" : {
            "All Campuses": {"path": "/api/campuses", "operations": "get, post"},
            "All Students": {"path": "/api/students", "operations": "get, post"},
            "Single Campus": {
              "path": "/api/campuses/:id", 
              "operations": "get, put, delete",
              "fields": "id (integer), name (string), imageUrl (string), address (string), description (string)",
              "notice": "post operation of parent will create Campus instance"
            },
            "Single Student": {
              "path": "/api/students/:id", 
              "operations": "get, put, delete", 
              "fields": "id (integer), firstname (string), lastname (string), email (string), imageUrl (string), gpa (double), campusId (integer)", 
              "notice": "post operation of parent will create Student instance"
            }
          }
        }
      ]
    )
  });
  // Handle routing error: Page Not Found
  // It is triggered when a request is made to an undefined route 
  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!");
    error.status = 404;
    next(error);  // Call Error-Handling Middleware to handle the error
  });
  // Routing Error-Handling Middleware:
  // All Express routes' errors get passed to this when "next(error)" is called
  app.use((err, req, res, next) => {
    console.error(err);
    console.log(req.originalUrl);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

/* SET UP BOOT FOR SERVER APPLICATION */
// Construct the boot process by incorporating all needed processes
const bootApp = async () => {
  await createDB();  // Create database (if not exists)
  await syncDatabase();  // Seed the database
  await configureApp();  // Start and configure Express application
};

/* START THE SERVER BOOT */
// Finally, run the boot process to start server application
bootApp();

/* ACTIVATE THE SERVER PORT */
// Set up express application to use port 5000 as the access point for the server application.
const PORT = 5000;  // Server application access point port number
app.listen(PORT, console.log(`Server started on ${PORT}`));