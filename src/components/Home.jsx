import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import BoardHeader from './BoardHeader';
import Column from './Column';
import TaskForm from './TaskForm';

import { updateTheme } from '../utils/themeUtils';
import { loadBoards, saveBoards } from '../utils/storageUtils';
import { getBoardById, handleAddBoard, handleDeleteBoard } from '../utils/boardUtils';
import { getColumnsByBoardId } from '../utils/columnUtils';
import { getTasksByColumnId, handleAddTask, handleSaveTask, handleDeleteTask, handleTaskMove } from '../utils/taskUtils';

function Home() {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    updateTheme();
  }, []);

  useEffect(() => {
    setBoards(loadBoards());
  }, []);

  useEffect(() => {
    saveBoards(boards);
  }, [boards, selectedBoardId]);

  if (boards.length === 0) {
    return (
      <main className='flex flex-col justify-center items-center h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text'>
        <h1>You have no boards yet.</h1>
        <button onClick={handleAddBoard}>Add board</button>
      </main>
    );
  } else {
    return (
      <div className="home">
        <TopBar
          boards={boards}
          onBoardSelect={setSelectedBoardId}
          onAddBoard={handleAddBoard}
          onDeleteBoard={handleDeleteBoard}
        />
        {selectedBoardId && (
          <div>
            <BoardHeader
              board={getBoardById}
              onDeleteBoard={handleDeleteBoard}
            />
            <div className="columns">
              {getColumnsByBoardId.map(column => (
                <Column
                  key={column.id}
                  column={column}
                  tasks={getTasksByColumnId}
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
  }
}

export default Home
