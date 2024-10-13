// Importing the todoList module and its methods
const todoList = require("../todo");
const { all, markAsComplete, add, getOverdueItems, getDueTodayItems, getDueLaterItems } = todoList();

describe("TodoList Test Suite", () => {
  // Runs before each test
  beforeEach(() => {
    // Clear the todo list to start fresh
    while (all().length > 0) {
      all().pop();
    }
    // Add a default todo item due today
    add({
      title: "Test todo 1",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10), // Today's date
    });
  });

  test("Should add a new todo", () => {
    const todoCount = all().length; // Get the current count
    add({
      title: "Test todo 2",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all().length).toBe(todoCount + 1); // Expect count to increase by 1
  });

  test("Should mark a todo as complete", () => {
    expect(all()[0].completed).toBe(false);
    markAsComplete(0);
    expect(all()[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    add({
      title: "Overdue todo",
      completed: false,
      dueDate: yesterday.toISOString().slice(0, 10),
    });

    const overdueItems = getOverdueItems();
    expect(overdueItems.length).toBe(1); // There should be one overdue item
    expect(overdueItems[0].title).toBe("Overdue todo");
  });

  test("Should retrieve due today items", () => {
    const todayItems = getDueTodayItems();
    expect(todayItems.length).toBe(1); // Includes "Test todo 1"
    expect(todayItems[0].title).toBe("Test todo 1");
  });

  test("Should retrieve due later items", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    add({
      title: "Due later todo",
      completed: false,
      dueDate: tomorrow.toISOString().slice(0, 10),
    });

    const dueLaterItems = getDueLaterItems();
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe("Due later todo");
  });
});
