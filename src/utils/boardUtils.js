export const getBoardByName = () => {
  // TO-DO
};

export const loadBoards = (setSelectedBoardName) => {
  const boards = JSON.parse(localStorage.getItem('boards')) || [];
  if (boards.length !== 0) {
    setSelectedBoardName(boards[0].name);
  }
  return boards;
};

export const startAddingBoard = (setIsAddingBoard) => {
  setIsAddingBoard(true);
};

export const cancelAddingBoard = (setIsAddingBoard) => {
  setIsAddingBoard(false);
};

export const startRemovingBoard = (setIsRemovingBoard) => {
  setIsRemovingBoard(true);
};

export const cancelRemovingBoard = (setIsRemovingBoard) => {
  setIsRemovingBoard(false);
};

export const isValidBoardName = (newBoardName) => {
  const existingBoards = JSON.parse(localStorage.getItem('boards')) || [];
  const nameExists = existingBoards.some(board => board.name === newBoardName);
  if (nameExists) {
    return false;
  } else {
    return true;
  }
};

export const saveNewBoard = (newBoardName, setNewBoardName, setIsAddingBoard, setBoards, setSelectedBoardName) => {
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
};

export const removeBoard = (removedBoardName, selectedBoardName, setRemovedBoardName, setIsRemovingBoard, setBoards, setSelectedBoardName) => {
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
};