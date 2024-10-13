// Array to store all task objects
const tasks = [];

// Function to add a new task
function addTask(task) {
  tasks.push(task);
}

// Function to mark a task as complete based on its index
function completeTask(index) {
  if (tasks[index]) {
    tasks[index].completed = true;
  }
}

// Function to get tasks that are overdue (past due date and not completed)
function getOverdueTasks() {
  const currentDate = new Date();
  return tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    return taskDate < currentDate && !task.completed;
  });
}

// Function to get tasks that are due today and not completed
function getTodayTasks() {
  const todayDate = new Date().toISOString().slice(0, 10);
  return tasks.filter(task => task.dueDate === todayDate && !task.completed);
}

// Function to get tasks that are due later (after today and not completed)
function getFutureTasks() {
  const currentDate = new Date();
  return tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    return taskDate > currentDate && !task.completed;
  });
}

// Function to get all tasks (returns the array)
function getAllTasks() {
  return tasks;
}

// Export all functions as part of a module
module.exports = () => ({
  all: getAllTasks,
  markAsComplete: completeTask,
  add: addTask,
  getOverdueItems: getOverdueTasks,
  getDueTodayItems: getTodayTasks,
  getDueLaterItems: getFutureTasks,
});
