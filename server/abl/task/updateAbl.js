const Ajv = require("ajv"); // Importing the Ajv library for JSON schema validation
const ajv = new Ajv(); // Creating a new Ajv instance

const taskDao = require("../../dao/task-dao.js"); // Importing the task data access object (DAO)

// Defining the JSON schema for the task object
const taskSchema = {
  type: "object",
  properties: {
    id: { type: "string" }, // The task object should have an "id" property of type string
    category: { type: "string" }, // The task object should have a "name" property of type string
    name: { type: "string" }, // The task object should have a "task" property of type string
    content: { type: "string" },
  },
  required: ["id", "category", "name", "content"], // The "id", "category", "name" and "content" properties are required
  additionalProperties: false, // No additional properties are allowed
};

// The UpdateAbl function is an asynchronous function that handles the updating of a task
async function UpdateAbl(req, res) {
  try {
    let task = req.body; // The task data is expected to be in the request body

    // Validate the task data against the schema
    const valid = ajv.validate(taskSchema, task);
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

    // If the data is valid, update the task using the task DAO
    const updatedTask = taskDao.update(task);
    if (!updatedTask) {
      // If the task does not exist
      // Respond with a 404 status code and a JSON object containing an error message
      res.status(404).json({
        code: "taskNotFound",
        task: `task ${task.id} not found`,
      });
      return; // End the function
    }

    // If the task exists, respond with a JSON object containing the updated nottask
    res.json(updatedTask);
  } catch (e) {
    // If an error occurs
    // Respond with a 500 status code and a JSON object containing the error message
    res.status(500).json({ task: e.task });
  }
}

module.exports = UpdateAbl; // Export the UpdateAbl function
