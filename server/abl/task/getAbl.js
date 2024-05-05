const Ajv = require("ajv"); // Importing the Ajv library for JSON schema validation
const ajv = new Ajv(); // Creating a new Ajv instance

const taskDao = require("../../dao/task-dao.js"); // Importing the task data access object (DAO)

// Defining the JSON schema for the task object
const taskSchema = {
  type: "object",
  properties: {
    id: { type: "string" }, // The task object should have an "id" property of type string
  },
  required: ["id"], // The "id" property is required
  additionalProperties: false, // No additional properties are allowed
};

// The GetAbl function is an asynchronous function that handles the retrieval of a task
async function GetAbl(req, res) {
  try {
    // The task data is expected to be in the request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // Validate the task data against the schema
    const valid = ajv.validate(taskSchema, reqParams);
    if (!valid) {
      // If the data is not valid
      // Respond with a 400 status code and a JSON object containing the validation errors
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return; // End the function
    }

    // If the data is valid, get the task using the task DAO
    const task = taskDao.get(reqParams.id);
    if (!task) {
      // If the task does not exist
      // Respond with a 404 status code and a JSON object containing an error message
      res.status(404).json({
        code: "taskNotFound",
        task: `task ${reqParams.id} not found`,
      });
      return; // End the function
    }

    // If the task exists, respond with a JSON object containing the task
    res.json(task);
  } catch (e) {
    // If an error occurs
    // Respond with a 500 status code and a JSON object containing the error message
    res.status(500).json({ task: e.task });
  }
}

module.exports = GetAbl; // Export the GetAbl function
