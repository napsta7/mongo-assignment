import express from "express";
import routes from "./routes/index.js"; //Importing the apiRoutes used in index.ts
import db from "./config/connection.js"; //Importing the database
await db();
const PORT = process.env.PORT || 3001; //Defining the port
const app = express(); //New instance of express
app.use(express.urlencoded({ extended: true })); //Enables the Express application to parse URL-encoded data
app.use(express.json()); //Enables the express application to parse incoming JSON requests
app.use(routes); //Using the routes
app.listen(PORT, () => {
    //Listen on port 3001 and confirm it was a success
    console.log(`API server running on port ${PORT}!`);
});
