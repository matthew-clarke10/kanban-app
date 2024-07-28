export const getBoardByName = () => {
  // TO-DO
};

export const loadBoards = (setSelectedBoardName) => {
  const boards = JSON.parse(localStorage.getItem('boards')) || [];
  if (boards.length !== 0) {
    setSelectedBoardName(boards[0]);
  }
  return boards;
};

export const startAddingBoard = (setIsAddingBoard) => {
  setIsAddingBoard(true);
};

export const cancelAddingBoard = (setIsAddingBoard) => {
  setIsAddingBoard(false);
};

export const saveNewBoard = (newBoardName, setIsAddingBoard, setBoards, setSelectedBoardName) => {
  handleAddBoard(newBoardName, setBoards);
  setSelectedBoardName(newBoardName);
  setIsAddingBoard(false);
};

export const handleAddBoard = (newBoardName, setBoards) => {
  const newBoard = {
    name: newBoardName,
    columns: ['Upcoming', 'Current', 'Finished']
  };

  const existingBoards = JSON.parse(localStorage.getItem('boards')) || [];
  existingBoards.push(newBoard);
  localStorage.setItem('boards', JSON.stringify(existingBoards));
  setBoards(existingBoards);
};

export const handleDeleteBoard = () => {
  // TO-DO
};