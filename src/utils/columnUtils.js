export const getColumnsByBoardName = (selectedBoardName) => {
  const boards = JSON.parse(localStorage.getItem('boards')) || [];
  const board = boards.find(board => board.name === selectedBoardName);
  return board ? board.columns : [];
};