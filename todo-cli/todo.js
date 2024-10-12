const todoList = () => {
  let tasks = [];
  
  const addTask = (task) => {
    tasks.push(task);
  };
  
  const markCompleted = (index) => {
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
    }
  };

  const getOverdue = () => {
    // Returning overdue tasks using a loop and conditional check
    let overdueTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].dueDate < today) {
        overdueTasks.push(tasks[i]);
      }
    }
    return overdueTasks;
  };

  const getDueToday = () => {
    // Using array reduce to filter tasks due today
    return tasks.reduce((dueTodayTasks, task) => {
      if (task.dueDate === today) {
        dueTodayTasks.push(task);
      }
      return dueTodayTasks;
    }, []);
  };

  const getDueLater = () => {
    // Using array mapping and filtering approach
    const laterTasks = tasks.map(task => {
      if (task.dueDate > today) {
        return task;
      }
    }).filter(task => task !== undefined);
    return laterTasks;
  };

  const formatTaskList = (taskList) => {
    // Formatting the list using an alternative approach with template literals
    const formattedList = taskList.map((task) => {
      const checkbox = task.completed ? '[x]' : '[ ]';
      const dateDisplay = (task.dueDate === today) ? '' : ` ${task.dueDate}`;
      return `${checkbox} ${task.title}${dateDisplay}`;
    });
    return formattedList.join('\n');
  };

  return {
    tasks,
    addTask,
    markCompleted,
    getOverdue,
    getDueToday,
    getDueLater,
    formatTaskList
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = d => {
  return d.toISOString().split("T")[0];
};

const currentDate = new Date();
const today = formattedDate(currentDate);
const prevDate = formattedDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
const nextDate = formattedDate(new Date(currentDate.setDate(currentDate.getDate() + 2)));

todos.addTask({ title: 'Submit assignment', dueDate: prevDate, completed: false });
todos.addTask({ title: 'Pay rent', dueDate: today, completed: true });
todos.addTask({ title: 'Service Vehicle', dueDate: today, completed: false });
todos.addTask({ title: 'File taxes', dueDate: nextDate, completed: false });
todos.addTask({ title: 'Pay electric bill', dueDate: nextDate, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
const overdueTasks = todos.getOverdue();
const formattedOverdue = todos.formatTaskList(overdueTasks);
console.log(formattedOverdue);
console.log("\n");

console.log("Due Today");
const todayTasks = todos.getDueToday();
const formattedToday = todos.formatTaskList(todayTasks);
console.log(formattedToday);
console.log("\n");

console.log("Due Later");
const laterTasks = todos.getDueLater();
const formattedLater = todos.formatTaskList(laterTasks);
console.log(formattedLater);
console.log("\n\n");
