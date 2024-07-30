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

export const addNewTask = (selectedBoardName, addingTask, newTaskName, setNewTaskName, setAddingTask) => {
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

  boards[boardIndex].columns[columnIndex].tasks.push({
    name: newTaskName,
    time: 'Today',
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