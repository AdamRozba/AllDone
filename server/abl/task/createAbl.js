const Ajv = require("ajv"); // Importing the Ajv library for JSON schema validation
const ajv = new Ajv(); // Creating a new Ajv instance

const taskDao = require("../../dao/task-dao.js"); // Importing the task data access object (DAO)

// Defining the JSON schema for the task object
const taskSchema = {
  type: "object",
  properties: {
    category: { type: "string" },
    name: { type: "string" },
    content: { type: "string" },
  },
  required: ["category", "name", "content"], // The "category", "name" and "content" properties are required
  additionalProperties: false, // No additional properties are allowed
};

// The CreateAbl function is an asynchronous function that handles the creation of a task
async function CreateAbl(req, res) {
  try {
    let task = req.body; // The task data is expected to be in the request body

    // Validate the task data against the schema
    const valid = ajv.validate(taskSchema, task);
    if (!valid) {
      // If the data is not valid
      // Respond with a 400 status code and a JSON object containing the validation errors
      res.status(400).json({
        code: "dtoInIsNotValid",
        node: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return; // End the function
    }

    // If the data is valid, create the task using the task DAO
    task = taskDao.create(task);
    // Respond with a JSON object containing the created task
    res.json(task); //this is what the database returns
  } catch (e) {
    // If an error occurs
    // Respond with a 500 status code and a JSON object containing the error message
    res.status(500).json({ task: e.task });
  }
}

module.exports = CreateAbl; // Export the CreateAbl function
