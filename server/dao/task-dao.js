const fs = require("fs"); // Importing the File System module
const path = require("path"); // Importing the Path module
const crypto = require("crypto"); // Importing the Crypto module

const taskFolderPath = path.join(__dirname, "storage", "taskList"); // Defining the path to the tasks folder

// Method to read a task from a file
function get(taskId) {
  try {
    const filePath = path.join(taskFolderPath, `${taskId}.json`); // Constructing the path to the task file
    const fileData = fs.readFileSync(filePath, "utf8"); // Reading the file data
    return JSON.parse(fileData); // Parsing the file data from JSON string to JavaScript object
  } catch (error) {
    if (error.code === "ENOENT") return null; // If the file does not exist, return null
    throw { code: "failedToReadtask", task: error.task }; // If another error occurred, throw it
  }
}

// Method to write a task to a file
function create(task) {
  try {
    task.id = crypto.randomBytes(16).toString("hex"); // Generating a random ID for the task
    const filePath = path.join(taskFolderPath, `${task.id}.json`); // Constructing the path to the task file
    const fileData = JSON.stringify(task); // Converting the task object to a JSON string
    fs.writeFileSync(filePath, fileData, "utf8"); // Writing the task data to the file
    return task; // Returning the task object
  } catch (error) {
    throw { code: "failedToCreateTask", task: error.task }; // If an error occurred, throw it
  }
}

// Method to update a task in a file
function update(task) {
  try {
    const currentTask = get(task.id); // Getting the current task data
    if (!currentTask) return null; // If the task does not exist, return null
    const newTask = { ...currentTask, ...task }; // Merging the current task data with the new data
    const filePath = path.join(taskFolderPath, `${task.id}.json`); // Constructing the path to the task file
    const fileData = JSON.stringify(newTask); // Converting the new task object to a JSON string
    fs.writeFileSync(filePath, fileData, "utf8"); // Writing the new task data to the file
    return newTask; // Returning the new task object
  } catch (error) {
    throw { code: "failedToUpdateTask", task: error.task }; // If an error occurred, throw it
  }
}

// Method to remove a task from a file
function remove(taskId) {
  try {
    const filePath = path.join(taskFolderPath, `${taskId}.json`); // Constructing the path to the task file
    fs.unlinkSync(filePath); // Deleting the task file
    return {}; // Returning an empty object
  } catch (error) {
    if (error.code === "ENOENT") {
      return {}; // If the file does not exist, return an empty object
    }
    throw { code: "failedToRemoveTask", task: error.task }; // If another error occurred, throw it
  }
}

// Method to list tasks in a folder
function list() {
  try {
    const files = fs.readdirSync(taskFolderPath); // Reading the names of all files in the tasks folder
    const taskList = files.map((file) => {
      // Transforming each filename into a task object
      const fileData = fs.readFileSync(path.join(taskFolderPath, file), "utf8"); // Reading the file data
      return JSON.parse(fileData); // Parsing the file data from JSON string to JavaScript object
    });
    return taskList; // Returning the list of task objects
  } catch (error) {
    throw { code: "failedToListTasks", task: error.task }; // If an error occurred, throw it
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
}; // Exporting the methods
