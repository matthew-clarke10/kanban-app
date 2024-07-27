import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import BoardHeader from './BoardHeader';
import Column from './Column';
import TaskForm from './TaskForm';

import { getBoardById, handleAddBoard, handleDeleteBoard } from '../utils/boardUtils';
import { getColumnsByBoardId } from '../utils/columnUtils';
import { getTasksByColumnId, handleAddTask, handleSaveTask, handleDeleteTask, handleTaskMove } from '../utils/taskUtils';

function Home() {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedBoards = JSON.parse(localStorage.getItem('boards')) || [];
    setBoards(savedBoards);
  }, []);

  useEffect(() => {
    if (selectedBoardId !== null) {
      localStorage.setItem('boards', JSON.stringify(boards));
    }
  }, [boards, selectedBoardId]);

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

export default Home
