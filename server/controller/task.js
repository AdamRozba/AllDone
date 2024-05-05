const express = require("express"); // Importing the Express framework
const router = express.Router(); // Creating a router object using Express

const GetAbl = require("../abl/task/getAbl"); // Importing the GetAbl module
const ListAbl = require("../abl/task/listAbl"); // Importing the ListAbl module
const CreateAbl = require("../abl/task/createAbl"); // Importing the CreateAbl module
const UpdateAbl = require("../abl/task/updateAbl"); // Importing the UpdateAbl module
const DeleteAbl = require("../abl/task/deleteAbl"); // Importing the DeleteAbl module

router.get("/", (req, res) => {
  res.send("Hello!"); //example, that this server site works
});

router.get("/get", (req, res) => {
  GetAbl(req, res); // Handling GET requests to the "/get" endpoint by calling the GetAbl function
});

router.get("/list", (req, res) => {
  ListAbl(req, res); // Handling GET requests to the "/list" endpoint by calling the ListAbl function
});

router.post("/create", (req, res) => {
  CreateAbl(req, res); // Handling POST requests to the "/create" endpoint by calling the CreateAbl function
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res); // Handling POST requests to the "/update" endpoint by calling the UpdateAbl function
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res); // Handling POST requests to the "/delete" endpoint by calling the DeleteAbl function
});

module.exports = router; // Exporting the router object to be used by other parts of the application
