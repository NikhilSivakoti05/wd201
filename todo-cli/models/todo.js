'use strict';
const { Model, DataTypes, Op } = require('sequelize');

module.exports = (sequelize) => {
  class Todo extends Model {
    // Adds a new task to the database
    static async addTask(taskDetails) {
      return await Todo.create(taskDetails); // Creates a new task with given details
    }

    // Displays the todo list in categories: Overdue, Due Today, and Due Later
    static async showList() {
      console.log("My Todo list\n");

      // Fetch different categories of tasks
      const pastTodos = await this.getPastTodos();
      const todayTodos = await this.getTodayTodos();
      const futureTodos = await this.getFutureTodos();

      // Print overdue tasks if there are any
      if (pastTodos.length > 0) {
        console.log("Overdue");
        pastTodos.forEach(task => {
          console.log(task.formatTask()); // Print each overdue task
        });
        console.log(""); // Add a blank line after overdue tasks
      }

      // Print tasks due today if there are any
      if (todayTodos.length > 0) {
        console.log("Due Today");
        todayTodos.forEach(task => {
          console.log(task.formatTask()); // Print each task due today
        });
        console.log(""); // Add a blank line after today's tasks
      }

      // Print future tasks if there are any
      if (futureTodos.length > 0) {
        console.log("Due Later");
        futureTodos.forEach(task => {
          console.log(task.formatTask()); // Print each future task
        });
      }
    }

    // Gets all tasks that are overdue (due date is before today)
    static async getPastTodos() {
      const todayDate = new Date(); // Get current date
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: todayDate // Tasks with due dates before today
          },
        }
      });
    }

    // Gets all tasks that are due today
    static async getTodayTodos() {
      const todayDate = new Date(); // Get current date
      return await Todo.findAll({
        where: {
          dueDate: todayDate.toISOString().split('T')[0], // Tasks due on today's date
        }
      });
    }

    // Gets all tasks that are due in the future (due date is after today)
    static async getFutureTodos() {
      const todayDate = new Date(); // Get current date
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: todayDate // Tasks with due dates after today
          },
        }
      });
    }

    // Marks a task as complete by its ID
    static async markTaskAsComplete(taskId) {
      const task = await Todo.findByPk(taskId); // Find task by ID
      if (task) {
        task.completed = true; // Mark task as completed
        await task.save(); // Save changes to the database
      }
    }

    // Formats a task for display with its status and due date
    formatTask() {
      const statusBox = this.completed ? "[x]" : "[ ]"; // Checkbox for task status
      const todayDate = new Date().toISOString().split('T')[0]; // Get today's date in string format

      // Format the task based on its status and due date
      if (this.completed && this.dueDate < todayDate) {
        // If task is completed but was overdue
        return `${this.id}. ${statusBox} ${this.title.trim()} ${this.dueDate}`;
      } else if (this.dueDate === todayDate) {
        // If task is due today
        return `${this.id}. ${statusBox} ${this.title.trim()}`;
      } else {
        // If task is in the future or incomplete
        return `${this.id}. ${statusBox} ${this.title.trim()} ${this.dueDate}`;
      }
    }
  }

  // Define the structure of the Todo table with fields: title, dueDate, and completed status
  Todo.init({
    title: DataTypes.STRING, // Task title as a string
    dueDate: DataTypes.DATEONLY, // Due date as a date (only date part)
    completed: DataTypes.BOOLEAN // Boolean value to check if task is completed
  }, {
    sequelize, // Sequelize instance
    modelName: 'Todo', // Name of the model
  });

  return Todo;
};
