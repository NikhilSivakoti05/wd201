// Import the todoList module and extract functions for testing
const todoApp = require("../todo");
const { all, markAsComplete, add, getOverdueItems, getDueTodayItems, getDueLaterItems } = todoApp;

// Describe the test suite for the TodoList
describe("Todo List Test Suite", () => {
  // This function runs before each test to reset the todo list
  beforeEach(() => {
    all().length = 0; // Clear all tasks before every test
    add({
      title: "Sample Task 1",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10), // Today's date
    });
  });

  // Test for adding a new task
  test("Add a new task", () => {
    const taskCount = all().length; // Get the current number of tasks
    add({
      title: "Sample Task 2",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10), // Today's date
    });
    expect(all().length).toBe(taskCount + 1); // Check if task count increased by 1
  });

  // Test for marking a task as complete
  test("Mark task as completed", () => {
    expect(all()[0].completed).toBe(false); // Check that the task is incomplete initially
    markAsComplete(0); // Mark the first task as complete
    expect(all()[0].completed).toBe(true); // Check that the task is now complete
  });

  // Test for retrieving overdue tasks
  test("Get overdue tasks", () => {
    all().length = 0; // Clear all tasks before adding new ones

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Set to one day ago
    add({
      title: "Overdue Task 1",
      completed: false,
      dueDate: yesterday.toISOString().slice(0, 10),
    });

    // Add another overdue task for testing
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2); // Set to two days ago
    add({
      title: "Overdue Task 2",
      completed: false,
      dueDate: twoDaysAgo.toISOString().slice(0, 10),
    });

    // Log the current tasks to see what is being stored
    console.log("Current Tasks:", all());

    const overdueTasks = getOverdueItems();
    console.log("Overdue Tasks:", overdueTasks); // Log the overdue tasks
    expect(overdueTasks.length).toBe(2); // Expect two overdue tasks
    expect(overdueTasks[0].title).toBe("Overdue Task 1"); // Check the title of the first overdue task
  });

  // Test for retrieving tasks due today
  test("Get tasks due today", () => {
    const todayTasks = getDueTodayItems();
    expect(todayTasks.length).toBe(1); // There should be one task due today ("Sample Task 1")
  });

  // Test for retrieving tasks due later
  test("Get tasks due later", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow
    add({
      title: "Future Task",
      completed: false,
      dueDate: tomorrow.toISOString().slice(0, 10),
    });

    const futureTasks = getDueLaterItems();
    expect(futureTasks.length).toBe(1); // There should be one task due later
    expect(futureTasks[0].title).toBe("Future Task"); // Check the title of the future task
  });
});
