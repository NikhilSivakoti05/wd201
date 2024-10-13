// Import the necessary modules
const todoList = require("../todo");
const { all, markAsComplete, add, getOverdueItems, getDueTodayItems, getDueLaterItems } = todoList();

// Group all tests under a test suite called "TodoList Test Suite"
describe("TodoList Test Suite", () => {
  // This function runs before each test case
  beforeEach(() => {
    // Clear all todo items before each test to start fresh
    all().length = 0;

    // Add a default todo item due today
    add({
      title: "Test todo 1",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10), // Today's date
    });
  });

  // Test case to check if a new todo can be added successfully
  test("Should add a new todo", () => {
    const initialCount = all().length; // Get the number of todos before adding

    // Add a new todo item with today's date
    add({
      title: "Test todo 2",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });

    // Check if the number of todos increased by 1
    expect(all().length).toBe(initialCount + 1);
  });

  // Test case to check if a todo can be marked as complete
  test("Should mark a todo as complete", () => {
    expect(all()[0].completed).toBe(false); // Check that the first todo is incomplete

    markAsComplete(0); // Mark the first todo as complete

    expect(all()[0].completed).toBe(true); // Check if it's marked as complete
  });

  // Test case to retrieve and check overdue items
  test("Should retrieve overdue items", () => {
    // Clear all todos to ensure no leftover data affects the test
    all().length = 0;

    // Create a date for yesterday and add a todo item with that date (overdue)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    add({
      title: "Overdue todo",
      completed: false,
      dueDate: yesterday.toISOString().slice(0, 10),
    });

    // Add another overdue item with a date 2 days ago
    const anotherOverdue = new Date();
    anotherOverdue.setDate(anotherOverdue.getDate() - 2);
    add({
      title: "Another Overdue todo",
      completed: false,
      dueDate: anotherOverdue.toISOString().slice(0, 10),
    });

    // Log current todos for debugging (optional)
    console.log("Current Todos:", all());

    // Get the list of overdue items
    const overdueItems = getOverdueItems();
    console.log("Overdue Items:", overdueItems); // Log overdue items for debugging

    // Check if there are exactly 2 overdue items and verify their titles
    expect(overdueItems.length).toBe(2);
    expect(overdueItems[0].title).toBe("Overdue todo");
  });

  // Test case to retrieve and check items due today
  test("Should retrieve due today items", () => {
    // Get the list of items due today
    const todayItems = getDueTodayItems();

    // Check if there is exactly 1 item due today (default item added in beforeEach)
    expect(todayItems.length).toBe(1);
    expect(todayItems[0].title).toBe("Test todo 1");
  });

  // Test case to retrieve and check items due later
  test("Should retrieve due later items", () => {
    // Create a date for tomorrow and add a todo item with that date (due later)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    add({
      title: "Due later todo",
      completed: false,
      dueDate: tomorrow.toISOString().slice(0, 10),
    });

    // Get the list of items due later
    const dueLaterItems = getDueLaterItems();

    // Check if there is exactly 1 item due later and verify its title
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe("Due later todo");
  });
});
