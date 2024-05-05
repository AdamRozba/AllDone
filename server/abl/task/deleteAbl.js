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

// The DeleteAbl function is an asynchronous function that handles the deletion of a task
async function DeleteAbl(req, res) {
  try {
    // The task data is expected to be in the request body
    const reqParams = req.body;

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

    // If the data is valid, remove the task using the task DAO
    taskDao.remove(reqParams.id);
    // Respond with an empty JSON object
    res.json({});
  } catch (e) {
    // If an error occurs
    // Respond with a 500 status code and a JSON object containing the error message
    res.status(500).json({ task: e.task });
  }
}

module.exports = DeleteAbl; // Export the DeleteAbl function
