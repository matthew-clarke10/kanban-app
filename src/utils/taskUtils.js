export const getTasksByColumn = (column) => {
  return [
    {
      name: 'Task 1',
      time: 'Today',
    },
    {
      name: 'Task 2',
      time: 'Today',
    },
    {
      name: 'Task 3',
      time: 'Today',
    },
  ];
};

export const startAddingTask = (setAddingTask, columnName) => {
  setAddingTask(columnName);
};

export const cancelAddingTask = (setAddingTask) => {
  setAddingTask(null);
};

export const isValidTaskDetails = (taskDate, taskTime, setValidTaskDateTime) => {
  const timePattern = /^([01]\d|2[0-3]):?([0-5]\d)$/;

  if (!taskDate || !taskTime || isNaN(Date.parse(taskDate)) || !taskTime.match(timePattern)) {
    setValidTaskDateTime(false);
    return false;
  } else {
    setValidTaskDateTime(true);
    return true;
  }
};

export const addNewTask = (selectedBoardName, taskDate, taskTime, addingTask, newTaskName, setNewTaskName, setAddingTask) => {
  const boards = JSON.parse(localStorage.getItem('boards')) || [];
  const boardIndex = boards.findIndex(board => board.name === selectedBoardName);
  if (boardIndex === -1) {
    console.error('Board not found');
    return;
  }

  const columnIndex = boards[boardIndex].columns.findIndex(column => column.name === addingTask);
  if (columnIndex === -1) {
    console.error('Column not found');
    return;
  }

  let maxTaskId = 0;
  boards[boardIndex].columns.forEach(column => {
    column.tasks.forEach(task => {
      if (task.id > maxTaskId) {
        maxTaskId = task.id;
      }
    });
  });

  const newTaskId = maxTaskId + 1;

  console.log(maxTaskId);

  boards[boardIndex].columns[columnIndex].tasks.push({
    id: newTaskId,
    name: newTaskName,
    date: taskDate,
    time: taskTime,
  });

  localStorage.setItem('boards', JSON.stringify(boards));
  setNewTaskName('');
  setAddingTask(null);
};

export const handleSaveTask = () => {
  // TO-DO
};

export const handleDeleteTask = () => {
  // TO-DO
};

export const handleTaskMove = () => {
  // TO-DO
};