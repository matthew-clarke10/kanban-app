export const loadBoards = () => {
  return JSON.parse(localStorage.getItem('boards')) || [];
};

export const saveBoards = (boards) => {
  localStorage.setItem('boards', JSON.stringify(boards));
};