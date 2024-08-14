export const isValidBoardName = (newBoardName) => {
  const existingBoards = JSON.parse(localStorage.getItem('boards')) || [];
  const nameExists = existingBoards.some(board => board.name === newBoardName);
  if (nameExists) {
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

export const addBoardStart = (setIsModalOpen, setModalType, setIsAddingBoard) => {
  setIsModalOpen(true);
  setModalType('Create Board');
  setIsAddingBoard(true);
};

export const addBoardFinish = (newBoardName, setNewBoardName, setIsAddingBoard, setBoards, setSelectedBoardName, setIsModalOpen) => {
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
  setIsModalOpen(false);
};

export const addBoardCancel = (setIsAddingBoard, setIsModalOpen) => {
  setIsAddingBoard(false);
  setIsModalOpen(false);
};

export const removeBoardStart = (setIsModalOpen, setModalType, setIsRemovingBoard) => {
  setIsRemovingBoard(true);
  setModalType('Delete Board');
  setIsModalOpen(true);
};

export const removeBoardCancel = (setIsRemovingBoard, setIsModalOpen) => {
  setIsRemovingBoard(false);
  setIsModalOpen(false);
};

export const removeBoardFinish = (removedBoardName, selectedBoardName, setRemovedBoardName, setIsRemovingBoard, setBoards, setSelectedBoardName, setIsModalOpen) => {
  const existingBoards = JSON.parse(localStorage.getItem('boards')) || [];
  const updatedBoards = existingBoards.filter(board => board.name !== removedBoardName);
  localStorage.setItem('boards', JSON.stringify(updatedBoards));
  setBoards(updatedBoards);

  if (removedBoardName === selectedBoardName) {
    if (updatedBoards.length > 0) {
      setSelectedBoardName(updatedBoards[0].name);
    } else {
      setSelectedBoardName('');
    }
  }

  setIsRemovingBoard(false);
  setRemovedBoardName('');
  setIsModalOpen(false);
};