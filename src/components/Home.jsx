import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import BoardHeader from './BoardHeader';
import Column from './Column';
import TaskForm from './TaskForm';

import { updateTheme } from '../utils/themeUtils';
import { getBoardByName, loadBoards, startAddingBoard, cancelAddingBoard, saveNewBoard, handleAddBoard, handleDeleteBoard } from '../utils/boardUtils';
import { getColumnsByBoardName } from '../utils/columnUtils';
import { getTasksByColumnName, handleAddTask, handleSaveTask, handleDeleteTask, handleTaskMove } from '../utils/taskUtils';

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [selectedBoardName, setSelectedBoardName] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    updateTheme();
  }, []);

  useEffect(() => {
    setBoards(loadBoards(setSelectedBoardName));
  }, []);

  useEffect(() => {
    console.log(boards);
    console.log(selectedBoardName);
  }, [boards, selectedBoardName]);

  if (boards.length === 0 && !isAddingBoard) {
    return (
      <main className='flex flex-col justify-center items-center h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text'>
        <h2>You have no boards yet.</h2>
        <button onClick={() => { startAddingBoard(setIsAddingBoard) }}>Add board</button>
      </main>
    );
  }

  return (
    <div className="home">
      <TopBar
        boards={boards}
        onBoardSelect={setSelectedBoardName}
        onAddBoard={handleAddBoard}
        onDeleteBoard={handleDeleteBoard}
      />
      {isAddingBoard && (
        <div>
          <h2>Add New Board</h2>
          <form onSubmit={() => { saveNewBoard(newBoardName, setIsAddingBoard, setBoards, setSelectedBoardName) }}>
            <input
              type="text"
              placeholder="Board Name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => { cancelAddingBoard(setIsAddingBoard) }}>Cancel</button>
          </form>
        </div>
      )}
      {selectedBoardName && (
        <div>
          <BoardHeader
            board={getBoardByName}
            onDeleteBoard={handleDeleteBoard}
          />
          <div className="columns">
            {getColumnsByBoardName(selectedBoardName).map(column => (
              <Column
                key={column.name}
                column={column.name}
                tasks={getTasksByColumnName}
                onAddTask={handleAddTask}
                onTaskEdit={setEditingTask}
                onTaskDelete={handleDeleteTask}
                onTaskMove={handleTaskMove}
              />
            ))}
          </div>
        </div>
      )}
      {editingTask && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default Home;