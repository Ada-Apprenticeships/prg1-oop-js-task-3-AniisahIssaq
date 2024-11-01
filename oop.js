PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger(value) { // value can be a string or a number (integer)
  
  // checks if the value is a number
  if (typeof value === 'number') {
    return Number.isInteger(value) && value >= 0; // must be a positive interger 
  }

  // checks if the value is a string
  if (typeof value === 'string') {
    const trimmedValue = value.trim(); // removes whitespace
    const num = Number(trimmedValue); // converts to a number 
    return Number.isInteger(num) && num >= 0 && trimmedValue === String(num);
  }

  // returns false if value is not valid
  return false;

}


function validatePriority(priority) { // value can be a string or a number (integer)
  
  const validPriorities = {
    1: "LOW",
    3: "MEDIUM",
    5: "HIGH",
    7: "URGENT"

  }; 

    // converts priority to a number 
    const numValue = Number(priority);
    if (validPriorities[numValue] !== undefined) {
      return numValue; // returns corresponding priority
    }
      
    return 1; // if value is invalid, returns LOW priority (1)

}


// function to get the current date and time 
function todaysDate() {
  const now = new Date(); // creates a new Date object for the current date and time

  const day = String(now.getDate()).padStart(2, "0"); // get the day and pad with leading zero if needed
  const month = String(now.getMonth() + 1).padStart(2, "0"); // get the month (0-based, so add 1) and pad
  const year = now.getFullYear(); // get the full year

  const hours = String(now.getHours()).padStart(2, "0"); // get the current hour and pad
  const minutes = String(now.getMinutes()).padStart(2, "0"); // get the current minutes and pad
  const seconds = String(now.getSeconds()).padStart(2, "0"); // get the current seconds and pad

  // Return the formatted date and time string in the format "DD/MM/YYYY HH:MM:SS"
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// task class to represent a task with a title, priority, and date added
class Task {
  #title; // private variable for the task title, priority and date added
  #priority; 
  #added; 
  
  constructor(title, priority) {
    this.#title = title; // sets the task title
    this.#priority = validatePriority(priority); // validates and set the task priority
    this.#added = todaysDate(); // sets the added date using todaysDate function
  }
    
  // getter for the task title
  get title() {
    return this.#title;
  }

  // getter for the task priority
  get priority() {
    return this.#priority;
  }

  // setter for the task priority
  set priority(priority) {
    this.#priority = validatePriority(priority); // validate and set the priority
  }

  // getter for the date the task was added
  get added() {
    return this.#added;
  }
}

// ToDo class to manage a list of tasks
class ToDo {
  constructor() {
    this.tasks = []; // creates an empty array to store tasks
  }

  // lists all tasks or filters by priority
  list(priority = 0) {
    if (priority === 0) {
      // returns all tasks if no specific priority is given
      return this.tasks.map(task => [task.added, task.title, task.priority]);
    } else {
      // filters and return tasks matching the specified priority
      return this.tasks
        .filter(task => task.priority === priority)
        .map(task => [task.added, task.title, task.priority]);
    }
  }

  // adds a new task to the list
  add(task) {
    this.tasks.push(task); // adds the task to the tasks array
    return this.tasks.length; // returns the new total number of tasks
  } 
  
  // removes a task by title
  remove(title) {
    const index = this.tasks.findIndex(task => task.title === title); // finds the task by title
    if (index !== -1) {
      this.tasks.splice(index, 1); // removes the task if found
      return true; // returns true if the task was removed
    }
    return false; // returns false if the task was not found
  }
   
  // retrieves a task by title
  task(title) {
    const foundTask = this.tasks.find(task => task.title === title); // finds the task by title
    if (foundTask) {
      return foundTask; // returns the found task
    } else {
      throw new Error(`Task '${title}' Not Found.`); // throws an error if the task is not found
    }
  }
}


// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}