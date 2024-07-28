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

  // No boards created yet.
  if (boards.length === 0 && !isAddingBoard) {
    return (
      <main className='flex flex-col items-center min-h-screen p-2 text-2xl bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text'>
        <h1 className='text-4xl text-center'>KanBan Boards</h1>
        <section className='flex flex-1 flex-col justify-center items-center h-full gap-y-2'>
          <h2>Click to add a new board</h2>
          <button onClick={() => { startAddingBoard(setIsAddingBoard) }} className='flex justify-center items-center px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Add board</button>
        </section>
      </main>
    );
  }

  // No boards created but the user is creating one now.
  if (boards.length === 0 && isAddingBoard) {
    return (
      <main className='flex flex-col items-center min-h-screen p-2 text-2xl bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text'>
        <h1 className='text-4xl text-center'>KanBan Boards</h1>
        <section className='flex flex-1 flex-col justify-center items-center h-full gap-y-2'>
          <h2>New Board</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            saveNewBoard(newBoardName, setIsAddingBoard, setBoards, setSelectedBoardName);
          }}
            className='flex flex-col gap-y-4'>
            <input
              type="text"
              placeholder="Enter name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              required
              className='rounded-full px-4 py-2 bg-light-bg-faded text-light-text dark:bg-dark-bg-faded dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text'
            />
            <div className='flex justify-evenly'>
              <button type='submit' className='w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Save</button>
              <button type='button' onClick={() => { cancelAddingBoard(setIsAddingBoard) }} className='w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Cancel</button>
            </div>
          </form>
        </section>
      </main>
    );
  }

  // User has at least one board created.
  return (
    <main className='flex flex-col min-h-screen p-2 bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text'>
      <h1 className='text-4xl text-center'>KanBan Boards</h1>
      <TopBar
        boards={boards}
        onBoardSelect={setSelectedBoardName}
        onAddBoard={handleAddBoard}
      />
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
    </main>
  );
};

export default Home;