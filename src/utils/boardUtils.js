export const isValidBoardName = (newBoardName) => {
  const existingBoards = JSON.parse(localStorage.getItem('boards')) || [];
  const nameExists = existingBoards.some(board => board.name === newBoardName);
  if (nameExists || newBoardName === '') {
    return false;
  } else {
    return true;
  }
};

export const loadBoards = (setSelectedBoardName) => {
  const boards = JSON.parse(localStorage.getItem('boards')) || [];
  if (boards.length !== 0) {
    setSelectedBoardName(boards[0].name);
  }
  return boards;
};

export const addBoardStart = (setIsAddBoardOpen, setIsAddingBoard) => {
  setIsAddBoardOpen(true);
  setIsAddingBoard(true);
};

export const addBoardFinish = (newBoardName, setNewBoardName, setIsAddingBoard, setBoards, setSelectedBoardName, onClose) => {
  const newBoard = {
    name: newBoardName,
    columns: [
      {
        name: 'Upcoming',
        tasks: [],
      },
      {
        name: 'Current',
        tasks: [],
      },
      {
        name: 'Finished',
        tasks: [],
      },
    ]
  };

  const existingBoards = JSON.parse(localStorage.getItem('boards')) || [];
  existingBoards.push(newBoard);
  localStorage.setItem('boards', JSON.stringify(existingBoards));
  setBoards(existingBoards);
  setSelectedBoardName(newBoardName);
  setIsAddingBoard(false);
  setNewBoardName('');
  onClose();
};

export const addBoardCancel = (setIsAddingBoard, setIsModalOpen) => {
  setIsAddingBoard(false);
  setIsModalOpen(false);
};

export const deleteBoardStart = (setIsDeleteBoardOpen, setIsDeletingBoard) => {
  setIsDeleteBoardOpen(true);
  setIsDeletingBoard(true);
};

export const deleteBoardCancel = (setIsDeletingBoard, setIsModalOpen) => {
  setIsDeletingBoard(false);
  setIsModalOpen(false);
};

export const deleteBoardFinish = (deletedBoardName, selectedBoardName, setDeletedBoardName, setIsDeletingBoard, setBoards, setSelectedBoardName, onClose) => {
  const existingBoards = JSON.parse(localStorage.getItem('boards')) || [];
  const updatedBoards = existingBoards.filter(board => board.name !== deletedBoardName);
  localStorage.setItem('boards', JSON.stringify(updatedBoards));
  setBoards(updatedBoards);

  if (deletedBoardName === selectedBoardName) {
    if (updatedBoards.length > 0) {
      setSelectedBoardName(updatedBoards[0].name);
    } else {
      setSelectedBoardName('');
    }
  }

  setIsDeletingBoard(false);
  setDeletedBoardName('');
  onClose();
};