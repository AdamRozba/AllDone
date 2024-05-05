const taskDao = require("../../dao/task-dao.js"); // Importing the task data access object (DAO)

// The ListAbl function is an asynchronous function that handles the listing of all tasks
async function ListAbl(req, res) {
  try {
    const taskList = taskDao.list(); // Get the list of all tasks using the task DAO
    res.json(taskList); // Respond with a JSON object containing the list of tasks
  } catch (e) {
    // If an error occurs
    // Respond with a 500 status code and a JSON object containing the error message
    res.status(500).json({ task: e.task });
  }
}

module.exports = ListAbl; // Export the ListAbl function
