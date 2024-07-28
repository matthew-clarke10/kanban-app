import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import BoardHeader from './BoardHeader';
import Column from './Column';
import TaskForm from './TaskForm';

import { updateTheme } from '../utils/themeUtils';
import { getBoardByName, loadBoards, startAddingBoard, startRemovingBoard, cancelAddingBoard, cancelRemovingBoard, isValidBoardName, saveNewBoard, removeBoard } from '../utils/boardUtils';
import { getColumnsByBoardName } from '../utils/columnUtils';
import { getTasksByColumnName, handleAddTask, handleSaveTask, handleDeleteTask, handleTaskMove } from '../utils/taskUtils';

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [validBoardName, setValidBoardName] = useState(true);
  const [isRemovingBoard, setIsRemovingBoard] = useState(false);
  const [removedBoardName, setRemovedBoardName] = useState('');
  const [selectedBoardName, setSelectedBoardName] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    updateTheme();
  }, []);

  useEffect(() => {
    setBoards(loadBoards(setSelectedBoardName));
  }, []);

  useEffect(() => {
    setNewBoardName('');
    setValidBoardName(true);
    setRemovedBoardName('');
  }, [boards, selectedBoardName, isAddingBoard, isRemovingBoard]);

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

  // User is creating a board now.
  if (isAddingBoard) {
    return (
      <main className='flex flex-col items-center min-h-screen p-2 text-2xl bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text'>
        <h1 className='text-4xl text-center'>KanBan Boards</h1>
        <section className='flex flex-1 flex-col justify-center items-center h-full gap-y-2'>
          <h2>New Board</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (isValidBoardName(newBoardName, setValidBoardName)) {
              setValidBoardName(true);
              saveNewBoard(newBoardName, setNewBoardName, setIsAddingBoard, setBoards, setSelectedBoardName);
            } else {
              setValidBoardName(false);
            }
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
            {!validBoardName && (
              <div className='text-center'>Name is Taken</div>
            )}
            <div className='flex justify-evenly gap-4 text-lg'>
              <button type='submit' className='w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Save</button>
              <button type='button' onClick={() => { cancelAddingBoard(setIsAddingBoard) }} className='w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Cancel</button>
            </div>
          </form>
        </section>
      </main>
    );
  }

  // User is removing a board now.
  if (isRemovingBoard) {
    return (
      <main className='flex flex-col items-center min-h-screen p-2 text-2xl bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text'>
        <h1 className='text-4xl text-center'>KanBan Boards</h1>
        <section className='flex flex-1 flex-col justify-center items-center h-full w-4/5 sm:w-[500px] gap-y-2'>
          <h2 className='text-2xl mt-4 mb-2'>Remove Board</h2>
          <section className='flex flex-col gap-2 w-full'>
            {boards.map(board => (
              <button key={board.name} onClick={() => setRemovedBoardName(board.name)} title={board.name} className={`flex justify-center items-center w-full py-4 border-2 text-lg border-light-text dark:border-dark-text ${removedBoardName === board.name ? 'bg-light-board dark:bg-dark-board' : 'bg-light-bg-faded dark:bg-dark-bg-faded hover:bg-light-board dark:hover:bg-dark-board hover:opacity-80'}`}>
                <span className={`overflow-hidden text-ellipsis whitespace-nowrap ${removedBoardName === board.name ? 'bg-light-board dark:bg-dark-board' : ''}`}>{board.name}</span>
              </button>
            ))}
          </section>
          <div className='flex justify-evenly gap-4 text-lg my-2'>
            <button type='button' onClick={() => { removeBoard(removedBoardName, selectedBoardName, setRemovedBoardName, setIsRemovingBoard, setBoards, setSelectedBoardName); }} className='w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Remove</button>
            <button type='button' onClick={() => { cancelRemovingBoard(setIsRemovingBoard) }} className='w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Cancel</button>
          </div>
        </section>
      </main>
    );
  }

  // User has at least one board created.
  return (
    <main className='flex flex-col min-h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text'>
      <h1 className='text-4xl text-center pt-4'>KanBan Boards</h1>
      <TopBar
        boards={boards}
        selectedBoardName={selectedBoardName}
        onBoardSelect={setSelectedBoardName}
        onAddBoard={() => { startAddingBoard(setIsAddingBoard) }}
        onDeleteBoard={() => { startRemovingBoard(setIsRemovingBoard) }}
      />
      {selectedBoardName && (
        <div>
          <BoardHeader
            board={getBoardByName}
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