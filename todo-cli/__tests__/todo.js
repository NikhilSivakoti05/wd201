// Import the todo list functions from the todo module
const todoList = require('../todo');

// Grouping all tests for the Todo List
describe('Todo List Testing', () => {
  let myTodoList;
  const todayDate = new Date().toISOString().split('T')[0]; // Get today's date
  const yesterdayDate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]; // Get yesterday's date
  const tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]; // Get tomorrow's date

  // This function runs before each test to set up the todo list
  beforeEach(() => {
    myTodoList = todoList(); // Create a new todo list for each test
    // Add some tasks to the list
    myTodoList.addTask({ title: 'Task A', dueDate: yesterdayDate, completed: false });
    myTodoList.addTask({ title: 'Task B', dueDate: todayDate, completed: false });
    myTodoList.addTask({ title: 'Task C', dueDate: todayDate, completed: true });
    myTodoList.addTask({ title: 'Task D', dueDate: tomorrowDate, completed: false });
  });

  // Test for adding a new task
  test('Should add a new task', () => {
    myTodoList.addTask({ title: 'Task E', dueDate: todayDate, completed: false });
    // Check if the new task was added correctly
    expect(myTodoList.tasks.length).toBe(5);
    expect(myTodoList.tasks[4].title).toBe('Task E');
  });

  // Test for marking a task as done
  test('Should mark a task as completed', () => {
    myTodoList.markCompleted(0); // Mark the first task as completed
    // Check if the task is marked correctly
    expect(myTodoList.tasks[0].completed).toBe(true);
  });

  // Test for finding overdue tasks
  test('Should show overdue tasks', () => {
    const overdueTasks = myTodoList.getOverdue(); // Get overdue tasks
    // Check if there is one overdue task and its title
    expect(overdueTasks.length).toBe(1);
    expect(overdueTasks[0].title).toBe('Task A');
  });

  // Test for finding today's tasks
  test('Should show tasks due today', () => {
    const todayTasks = myTodoList.getDueToday(); // Get tasks due today
    // Check if there are two tasks due today and their titles
    expect(todayTasks.length).toBe(2);
    expect(todayTasks[0].title).toBe('Task B');
    expect(todayTasks[1].title).toBe('Task C');
  });

  // Test for finding tasks due later
  test('Should show tasks due later', () => {
    const futureTasks = myTodoList.getDueLater(); // Get tasks due later
    // Check if there is one task due later and its title
    expect(futureTasks.length).toBe(1);
    expect(futureTasks[0].title).toBe('Task D');
  });
});
