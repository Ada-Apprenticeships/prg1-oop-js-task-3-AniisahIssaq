PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger(value) { // value can be a string or a number (integer)
  
  if (typeof value === 'number') {
    return Number.isInteger(value) && value > 0;
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim();
    const num = Number(trimmedValue);
    return Number.isInteger(num) && num > 0 && trimmedValue === String(num);
  }

  return false;

}


function validatePriority(priority) { // value can be a string or a number (integer)
  
  const validPriorities = {
    1: "LOW",
    3: "MEDIUM",
    5: "HIGH",
    7: "URGENT"

  }; 

    const numValue = Number(priority);
    if (validPriorities[numValue] !== undefined) {
      return numValue;
    }
      
    return 1;

}


function todaysDate () {
  
  const now = new Date();
  
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

 return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

}


class Task {
  _title;
  _priority;
  _added;
  
    constructor(title, priority) {
      this._title = title;
      this._priority = validatePriority(priority);
      this._added = todaysDate();
    }
    
  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    this._priority = validatePriority(priority);
  }

  get added() {
    return this._added;
  }



}


class ToDo {
   
    constructor() {
      this.tasks = [];
    }


  list (priority = 0) {
    if (priority === 0) {
      return this.tasks.map(task => [task.added, task.title, task.priority]);
    } else {
      return this.tasks
        .filter(task => task.priority === priority)
        .map(task => [task.added, task.title, task.priority]);
    }
  }

  add(Task) {
    this.tasks.push(Task);
    return this.tasks.length;
  } 
  
  remove(title) {
    const index = this.tasks.findIndex(task => task.title === title);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
   
  task(title) {
    const foundTask = this.tasks.find(task => task.title === title);
    if (foundTask) {
      return foundTask;
    } else {
      throw new Error (`Task '${title}' Not Found.`);
    } 
    
  }

}


// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}