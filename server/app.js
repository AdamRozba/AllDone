const express = require("express"); // Importing the Express framework
const cors = require("cors"); // Importing the CORS middleware
const app = express(); // Creating an Express application
const port = 8000; // Defining the port number on which the server will listen

const taskController = require("./controller/task"); // Importing the task controller

app.use(express.json()); // Adding middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Adding middleware to parse URL-encoded bodies

app.use(cors()); // Adding CORS middleware to allow cross-origin requests

app.get("/", (req, res) => {
  res.send("Hello World!"); // Defining a route handler for GET requests to the root URL
});

app.use("/task", taskController); // Adding the task controller as middleware, associating it with the path "/task"

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Starting the server and logging a message to the console
});
