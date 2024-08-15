import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import Column from './Column';
import CreateBoardModal from './modals/CreateBoardModal';
import RemoveBoardModal from './modals/RemoveBoardModal';
import CreateTaskModal from './modals/CreateTaskModal';
import EditTaskModal from './modals/EditTaskModal';
import DeleteTaskModal from './modals/DeleteTaskModal';
import MoveTaskModal from './modals/MoveTaskModal';

import { updateTheme } from '../utils/themeUtils';
import { isValidBoardName, loadBoards, addBoardStart, addBoardFinish, addBoardCancel, removeBoardStart, removeBoardFinish, removeBoardCancel } from '../utils/boardUtils';
import { getColumnsByBoardName } from '../utils/columnUtils';
import { isValidTaskDetails, addTaskStart, addTaskFinish, addTaskCancel, editTaskStart, editTaskFinish, editTaskCancel, deleteTaskStart, deleteTaskFinish, deleteTaskCancel, moveTaskStart, moveTaskFinish } from '../utils/taskUtils';
import { getTodaysDate, getDateOneYearFromNow } from '../utils/dateTimeUtils';

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [validBoardName, setValidBoardName] = useState(true);
  const [isRemovingBoard, setIsRemovingBoard] = useState(false);
  const [removedBoardName, setRemovedBoardName] = useState('');
  const [selectedRemovedBoardName, setSelectedRemovedBoardName] = useState(false);
  const [selectedBoardName, setSelectedBoardName] = useState(null);
  const [selectedColumnName, setSelectedColumnName] = useState('Upcoming');
  const [addingTask, setAddingTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [validTaskDateTime, setValidTaskDateTime] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [isRemoveBoardOpen, setIsRemoveBoardOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
  const [isMoveTaskOpen, setIsMoveTaskOpen] = useState(false);

  useEffect(() => {
    updateTheme();
  }, []);

  useEffect(() => {
    setBoards(loadBoards(setSelectedBoardName));
  }, []);

  useEffect(() => {
    setNewBoardName('');
    setValidBoardName(true);
  }, [isCreateBoardOpen]);

  useEffect(() => {
    setRemovedBoardName('');
    setSelectedRemovedBoardName(false);
  }, [isRemoveBoardOpen]);

  useEffect(() => {
    setNewTaskName('');
    setTaskDate('');
    setTaskTime('');
    setValidTaskDateTime(true);
  }, [isCreateTaskOpen]);

  // No boards created yet.
  if (boards.length === 0 && !isAddingBoard) {
    return (
      <main className='flex flex-col items-center min-h-screen p-2 text-2xl bg-light-bg-primary text-light-text dark:bg-dark-bg-primary dark:text-dark-text'>
        <h1 className='text-4xl text-center'>KanBan Boards</h1>
        <section className='flex flex-1 flex-col justify-center items-center h-full gap-y-2'>
          <h2>Click to add a new board</h2>
          <button onClick={() => { addBoardStart(setIsCreateBoardOpen, setIsAddingBoard) }} className='flex justify-center items-center px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Add board</button>
        </section>
      </main>
    );
  }

  // User has at least one board created.
  return (
    <main className='flex flex-col min-h-screen bg-light-bg-primary text-light-text dark:bg-dark-bg-primary dark:text-dark-text'>

      {isCreateBoardOpen && (
        <CreateBoardModal
          newBoardName={newBoardName}
          validBoardName={validBoardName}
          onClose={() => setIsCreateBoardOpen(false)}
          setNewBoardName={setNewBoardName}
          setValidBoardName={setValidBoardName}
          setSelectedBoardName={setSelectedBoardName}
          setIsAddingBoard={setIsAddingBoard}
          setBoards={setBoards}
        />
      )}

      {isRemoveBoardOpen && (
        <RemoveBoardModal
          boards={boards}
          removedBoardName={removedBoardName}
          selectedRemovedBoardName={selectedRemovedBoardName}
          selectedBoardName={selectedBoardName}
          onClose={() => setIsRemoveBoardOpen(false)}
          setSelectedRemovedBoardName={setSelectedRemovedBoardName}
          setRemovedBoardName={setRemovedBoardName}
          setIsRemovingBoard={setIsRemovingBoard}
          setSelectedBoardName={setSelectedBoardName}
          removeBoardFinish={removeBoardFinish}
          setBoards={setBoards}
        />
      )}

      {isCreateTaskOpen && (
        <CreateTaskModal
          addingTask={addingTask} newTaskName={newTaskName} taskDate={taskDate} taskTime={taskTime} validTaskDateTime={validTaskDateTime} selectedBoardName={selectedBoardName} onClose={() => setIsCreateTaskOpen(false)} setAddingTask={setAddingTask} setNewTaskName={setNewTaskName} setTaskDate={setTaskDate} setTaskTime={setTaskTime} isValidTaskDetails={isValidTaskDetails} setValidTaskDateTime={setValidTaskDateTime} addTaskFinish={addTaskFinish} getTodaysDate={getTodaysDate} getDateOneYearFromNow={getDateOneYearFromNow}
        />
      )}

      {isEditTaskOpen && (
        <EditTaskModal
          addingTask={addingTask} newTaskName={newTaskName} taskDate={taskDate} taskTime={taskTime} validTaskDateTime={validTaskDateTime} selectedBoardName={selectedBoardName} onClose={() => setIsCreateTaskOpen(false)} setAddingTask={setAddingTask} setNewTaskName={setNewTaskName} setTaskDate={setTaskDate} setTaskTime={setTaskTime} isValidTaskDetails={isValidTaskDetails} setValidTaskDateTime={setValidTaskDateTime} addTaskFinish={addTaskFinish} getTodaysDate={getTodaysDate} getDateOneYearFromNow={getDateOneYearFromNow}
        />
      )}

      {isDeleteTaskOpen && (
        <DeleteTaskModal
          addingTask={addingTask} newTaskName={newTaskName} taskDate={taskDate} taskTime={taskTime} validTaskDateTime={validTaskDateTime} selectedBoardName={selectedBoardName} onClose={() => setIsCreateTaskOpen(false)} setAddingTask={setAddingTask} setNewTaskName={setNewTaskName} setTaskDate={setTaskDate} setTaskTime={setTaskTime} isValidTaskDetails={isValidTaskDetails} setValidTaskDateTime={setValidTaskDateTime} addTaskFinish={addTaskFinish} getTodaysDate={getTodaysDate} getDateOneYearFromNow={getDateOneYearFromNow}
        />
      )}

      {isMoveTaskOpen && (
        <MoveTaskModal
          addingTask={addingTask} newTaskName={newTaskName} taskDate={taskDate} taskTime={taskTime} validTaskDateTime={validTaskDateTime} selectedBoardName={selectedBoardName} onClose={() => setIsCreateTaskOpen(false)} setAddingTask={setAddingTask} setNewTaskName={setNewTaskName} setTaskDate={setTaskDate} setTaskTime={setTaskTime} isValidTaskDetails={isValidTaskDetails} setValidTaskDateTime={setValidTaskDateTime} addTaskFinish={addTaskFinish} getTodaysDate={getTodaysDate} getDateOneYearFromNow={getDateOneYearFromNow}
        />
      )}

      <h1 className='text-4xl text-center pt-4'>KanBan Boards</h1>
      {boards.length !== 0 && (
        <TopBar
          boards={boards}
          selectedBoardName={selectedBoardName}
          onBoardSelect={setSelectedBoardName}
          onAddBoard={() => { addBoardStart(setIsCreateBoardOpen, setIsAddingBoard) }}
          onDeleteBoard={() => { removeBoardStart(setIsRemoveBoardOpen, setIsRemovingBoard) }}
        />
      )}
      {selectedBoardName && (
        <section className='flex flex-col md:flex-row justify-start md:justify-between w-full flex-1 px-4 pb-4'>
          {getColumnsByBoardName(selectedBoardName).map((column, index) => (
            <section
              key={column.name}
              className={`flex flex-col transition-all duration-300 ${selectedColumnName === column.name ? 'flex-1' : 'flex-0'} w-full' md:flex-1 border-b-2 border-x-2 ${index === 0 ? 'md:border-l-2 border-t-2' : 'md:border-l-0 md:border-t-2'} ${index < getColumnsByBoardName(selectedBoardName).length - 1 ? 'md:border-r-2' : ''} border-light-text dark:border-dark-text`}
            >
              <Column
                key={column.name}
                column={column}
                selectedColumnName={selectedColumnName}
                setSelectedColumnName={setSelectedColumnName}
                onAddTask={() => { addTaskStart(column.name, setIsCreateTaskOpen, setAddingTask) }}
                onTaskEdit={(task) => editTaskStart(task, setIsEditTaskOpen, setEditingTask)}
                onTaskDelete={deleteTaskStart}
                onTaskMove={deleteTaskStart}
              />
            </section>
          ))}
        </section>
      )}
    </main>
  );
};

export default Home;