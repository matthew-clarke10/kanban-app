export const isValidTaskDetails = (taskName, taskDate, taskTime, setValidTaskDateTime) => {
  const timePattern = /^([01]\d|2[0-3]):?([0-5]\d)$/;

  if (taskName === '' || !taskDate || !taskTime || isNaN(Date.parse(taskDate)) || !taskTime.match(timePattern)) {
    setValidTaskDateTime(false);
    return false;
  } else {
    setValidTaskDateTime(true);
    return true;
  }
};

export const addTaskStart = (columnName, setIsCreateTaskOpen, setAddingTask) => {
  setIsCreateTaskOpen(true);
  setAddingTask(columnName);
};

export const addTaskFinish = (selectedBoardName, taskDate, taskTime, addingTask, newTaskName, setNewTaskName, setAddingTask, onClose) => {
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

  boards[boardIndex].columns[columnIndex].tasks.push({
    id: newTaskId,
    name: newTaskName,
    date: taskDate,
    time: taskTime,
  });

  localStorage.setItem('boards', JSON.stringify(boards));
  setNewTaskName('');
  setAddingTask(null);
  onClose();
};

export const addTaskCancel = (setAddingTask, setIsModalOpen) => {
  setAddingTask(null);
  setIsModalOpen(false);
};

export const editTaskStart = (columnName, task, setIsEditTaskOpen, setEditingColumn, setEditingTask) => {
  setIsEditTaskOpen(true);
  setEditingColumn(columnName);
  setEditingTask(task);
};

export const editTaskFinish = (selectedBoardName, editingColumn, editingTask, setEditingTask, setEditingColumn, onClose) => {
  const boards = JSON.parse(localStorage.getItem('boards')) || [];
  const boardIndex = boards.findIndex(board => board.name === selectedBoardName);
  if (boardIndex === -1) {
    console.error('Board not found');
    return;
  }

  const columnIndex = boards[boardIndex].columns.findIndex(column => column.name === editingColumn);
  if (columnIndex === -1) {
    console.error('Column not found');
    return;
  }

  boards[boardIndex].columns[columnIndex].tasks.forEach((task, index) => {
    if (task.id === editingTask.id) {
      boards[boardIndex].columns[columnIndex].tasks[index] = editingTask;
    }
  });

  localStorage.setItem('boards', JSON.stringify(boards));
  setEditingTask(null);
  setEditingColumn(null);
  onClose();
};

export const editTaskCancel = () => {
  // TO-DO
};

export const deleteTaskStart = (columnName, task, setIsDeleteTaskOpen, setEditingColumn, setEditingTask) => {
  setIsDeleteTaskOpen(true);
  setEditingColumn(columnName);
  setEditingTask(task);
};

export const deleteTaskFinish = (selectedBoardName, editingColumn, editingTask, setEditingTask, setEditingColumn, onClose) => {
  const boards = JSON.parse(localStorage.getItem('boards')) || [];
  const boardIndex = boards.findIndex(board => board.name === selectedBoardName);
  if (boardIndex === -1) {
    console.error('Board not found');
    return;
  }

  const columnIndex = boards[boardIndex].columns.findIndex(column => column.name === editingColumn);
  if (columnIndex === -1) {
    console.error('Column not found');
    return;
  }

  boards[boardIndex].columns[columnIndex].tasks.forEach((task, index) => {
    if (task.id === editingTask.id) {
      boards[boardIndex].columns[columnIndex].tasks.splice(index, 1);
    }
  });

  localStorage.setItem('boards', JSON.stringify(boards));
  setEditingTask(null);
  setEditingColumn(null);
  onClose();
};

export const deleteTaskCancel = () => {
  // TO-DO
};

export const moveTaskStart = (columnName, task, setIsMoveTaskOpen, setMovingColumn, setMovingTask) => {
  setIsMoveTaskOpen(true);
  setMovingColumn(columnName);
  setMovingTask(task);
};

export const moveTaskFinish = (selectedBoardName, movingColumn, movingTask, setMovingTask, setMovingColumn, onClose) => {
  const boards = JSON.parse(localStorage.getItem('boards')) || [];
  const boardIndex = boards.findIndex(board => board.name === selectedBoardName);
  if (boardIndex === -1) {
    console.error('Board not found');
    return;
  }

  const columnIndex = boards[boardIndex].columns.findIndex(column => column.name === movingColumn);
  if (columnIndex === -1) {
    console.error('Column not found');
    return;
  }

  boards[boardIndex].columns.forEach((column) => {
    column.tasks.forEach((task, taskIndex) => {
      if (task.id === movingTask.id) {
        if (column.name === movingColumn) {
          setMovingTask(null);
          setMovingColumn(null);
          onClose();
          return;
        } else {
          column.tasks.splice(taskIndex, 1);
          boards[boardIndex].columns[columnIndex].tasks.push(movingTask);
          localStorage.setItem('boards', JSON.stringify(boards));
          setMovingTask(null);
          setMovingColumn(null);
          onClose();
          return;
        }
      }
    });
  });
};