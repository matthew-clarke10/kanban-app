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

export const addTaskStart = (columnName, setIsModalOpen, setModalType, setAddingTask) => {
  setIsModalOpen(true);
  setModalType('Add Task');
  setAddingTask(columnName);
};

export const addTaskFinish = (selectedBoardName, taskDate, taskTime, addingTask, newTaskName, setNewTaskName, setAddingTask, setIsModalOpen) => {
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
  setIsModalOpen(false)
};

export const addTaskCancel = (setAddingTask, setIsModalOpen) => {
  setAddingTask(null);
  setIsModalOpen(false);
};

export const editTaskStart = (task, setIsModalOpen, setModalType, setEditingTask) => {
  setIsModalOpen(true);
  setModalType('Edit Task');
  setEditingTask(task);
};

export const editTaskFinish = () => {
  // TO-DO
};

export const editTaskCancel = () => {
  // TO-DO
};

export const deleteTaskStart = () => {
  // TO-DO
};

export const deleteTaskFinish = () => {
  // TO-DO
};

export const deleteTaskCancel = () => {
  // TO-DO
};

export const moveTaskStart = () => {
  // TO-DO
};

export const moveTaskFinish = () => {
  // TO-DO
};