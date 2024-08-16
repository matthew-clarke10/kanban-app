import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import Column from './Column';
import AddBoardModal from './modals/AddBoardModal';
import DeleteBoardModal from './modals/DeleteBoardModal';
import AddTaskModal from './modals/AddTaskModal';
import EditTaskModal from './modals/EditTaskModal';

import { updateTheme } from '../utils/themeUtils';
import { loadBoards, addBoardStart, deleteBoardStart, deleteBoardFinish } from '../utils/boardUtils';
import { getColumnsByBoardName } from '../utils/columnUtils';
import { addTaskStart, editTask } from '../utils/taskUtils';

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [validBoardName, setValidBoardName] = useState(true);
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [deletedBoardName, setDeletedBoardName] = useState('');
  const [selectedDeletedBoardName, setSelectedDeletedBoardName] = useState(false);
  const [selectedBoardName, setSelectedBoardName] = useState(null);
  const [selectedColumnName, setSelectedColumnName] = useState('Upcoming');
  const [addingTask, setAddingTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [validTaskDateTime, setValidTaskDateTime] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const [isDeleteBoardOpen, setIsDeleteBoardOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);
  const [isMovingTask, setIsMovingTask] = useState(false);

  useEffect(() => {
    updateTheme();
  }, []);


  useEffect(() => {
    setBoards(loadBoards(setSelectedBoardName));
  }, [isMovingTask]);

  useEffect(() => {
    setNewBoardName('');
    setValidBoardName(true);
  }, [isAddBoardOpen]);

  useEffect(() => {
    setDeletedBoardName('');
    setSelectedDeletedBoardName(false);
  }, [isDeleteBoardOpen]);

  useEffect(() => {
    setNewTaskName('');
    setTaskDate('');
    setTaskTime('');
    setValidTaskDateTime(true);
  }, [isAddTaskOpen, isEditTaskOpen]);

  // No boards added yet.
  if (boards.length === 0 && !isAddingBoard) {
    return (
      <main className='flex flex-col items-center min-h-screen p-2 text-2xl bg-light-bg-primary text-light-text dark:bg-dark-bg-primary dark:text-dark-text'>
        <h1 className='text-4xl text-center'>KanBan Boards</h1>
        <section className='flex flex-1 flex-col justify-center items-center h-full gap-y-2'>
          <h2>Click to add a new board</h2>
          <button onClick={() => { addBoardStart(setIsAddBoardOpen, setIsAddingBoard) }} className='flex justify-center items-center px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Add board</button>
        </section>
      </main>
    );
  }

  // User has at least one board added.
  return (
    <main className='flex flex-col min-h-screen bg-light-bg-primary text-light-text dark:bg-dark-bg-primary dark:text-dark-text'>

      {isAddBoardOpen && (
        <AddBoardModal
          newBoardName={newBoardName}
          validBoardName={validBoardName}
          onClose={() => setIsAddBoardOpen(false)}
          setNewBoardName={setNewBoardName}
          setValidBoardName={setValidBoardName}
          setSelectedBoardName={setSelectedBoardName}
          setIsAddingBoard={setIsAddingBoard}
          setBoards={setBoards}
        />
      )}

      {isDeleteBoardOpen && (
        <DeleteBoardModal
          boards={boards}
          deletedBoardName={deletedBoardName}
          selectedDeletedBoardName={selectedDeletedBoardName}
          selectedBoardName={selectedBoardName}
          onClose={() => setIsDeleteBoardOpen(false)}
          setSelectedDeletedBoardName={setSelectedDeletedBoardName}
          setDeletedBoardName={setDeletedBoardName}
          setIsDeletingBoard={setIsDeletingBoard}
          setSelectedBoardName={setSelectedBoardName}
          deleteBoardFinish={deleteBoardFinish}
          setBoards={setBoards}
        />
      )}

      {isAddTaskOpen && (
        <AddTaskModal
          addingTask={addingTask}
          newTaskName={newTaskName}
          taskDate={taskDate}
          taskTime={taskTime}
          validTaskDateTime={validTaskDateTime}
          selectedBoardName={selectedBoardName}
          onClose={() => setIsAddTaskOpen(false)}
          setAddingTask={setAddingTask}
          setNewTaskName={setNewTaskName}
          setTaskDate={setTaskDate}
          setTaskTime={setTaskTime}
          setValidTaskDateTime={setValidTaskDateTime}
        />
      )}

      {isEditTaskOpen && (
        <EditTaskModal
          editingTask={editingTask}
          editingColumn={editingColumn}
          validTaskDateTime={validTaskDateTime}
          selectedBoardName={selectedBoardName}
          onClose={() => setIsEditTaskOpen(false)}
          setEditingTask={setEditingTask}
          setEditingColumn={setEditingColumn}
          setNewTaskName={setNewTaskName}
          setTaskDate={setTaskDate}
          setTaskTime={setTaskTime}
          setValidTaskDateTime={setValidTaskDateTime}
        />
      )}

      <h1 className='text-4xl text-center pt-4'>KanBan Boards</h1>
      {boards.length !== 0 && (
        <TopBar
          boards={boards}
          selectedBoardName={selectedBoardName}
          onBoardSelect={setSelectedBoardName}
          onAddBoard={() => { addBoardStart(setIsAddBoardOpen, setIsAddingBoard) }}
          onDeleteBoard={() => { deleteBoardStart(setIsDeleteBoardOpen, setIsDeletingBoard) }}
        />
      )}
      {selectedBoardName && (
        <section className='flex flex-col md:flex-row justify-start md:justify-between w-full flex-1 px-4 pb-4'>
          {getColumnsByBoardName(selectedBoardName).map((column, index) => (
            <section
              key={column.name}
              className={`flex flex-col transition-all duration-300 ${selectedColumnName === column.name ? 'flex-1' : 'flex-0'} w-full md:flex-1 border-b-2 border-x-2 ${index === 0 ? 'md:border-l-2 border-t-2' : 'md:border-l-0 md:border-t-2'} ${index < getColumnsByBoardName(selectedBoardName).length - 1 ? 'md:border-r-2' : ''} border-light-text dark:border-dark-text`}
            >
              <Column
                key={column.name}
                board={selectedBoardName}
                column={column}
                selectedColumnName={selectedColumnName}
                setIsMovingTask={setIsMovingTask}
                setSelectedColumnName={setSelectedColumnName}
                onAddTask={() => { addTaskStart(column.name, setIsAddTaskOpen, setAddingTask) }}
                onEditTask={(task) => editTask(column.name, task, setIsEditTaskOpen, setEditingColumn, setEditingTask)}
              />
            </section>
          ))}
        </section>
      )}
    </main>
  );
};

export default Home;