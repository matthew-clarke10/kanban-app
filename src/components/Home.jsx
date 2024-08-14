import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import Column from './Column';
import Modal from './Modal';
import CreateBoardModal from './modals/CreateBoardModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

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
    setSelectedRemovedBoardName(false);
    setNewTaskName('');
    setTaskDate('');
    setTaskTime('');
    setValidTaskDateTime(true);
  }, [boards, selectedBoardName, isAddingBoard, isRemovingBoard, addingTask]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderModal = () => {
    switch (modalType) {
      case 'Create Board':
        return <CreateBoardModal newBoardName={newBoardName} validBoardName={validBoardName} isValidBoardName={isValidBoardName} setValidBoardName={setValidBoardName} addBoardFinish={addBoardFinish} addBoardCancel={addBoardCancel} setNewBoardName={setNewBoardName} setIsAddingBoard={setIsAddingBoard} setBoards={setBoards} setSelectedBoardName={setSelectedBoardName} setIsModalOpen={setIsModalOpen} />;
      case 'Delete Board':
        return (
          <section className='flex flex-1 flex-col justify-center items-center h-full gap-y-2'>
            <h1 className='text-4xl text-center'>KanBan Boards</h1>
            <section className='flex flex-1 flex-col justify-center items-center h-full w-4/5 sm:w-[500px] gap-y-2'>
              <h2 className='text-2xl mt-4 mb-2'>Remove Board</h2>
              <section className='flex flex-col gap-2 w-full'>
                {boards.map(board => (
                  <button key={board.name} onClick={() => setRemovedBoardName(board.name)} title={board.name} className={`flex justify-center items-center w-full py-4 border-2 text-lg border-light-text dark:border-dark-text ${removedBoardName === board.name ? 'bg-light-board dark:bg-dark-board' : 'bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-board dark:hover:bg-dark-board hover:opacity-80'}`}>
                    <span className={`overflow-hidden text-ellipsis whitespace-nowrap ${removedBoardName === board.name ? 'bg-light-board dark:bg-dark-board' : ''}`}>{board.name}</span>
                  </button>
                ))}
              </section>
              {selectedRemovedBoardName && (
                <div className='text-center'>Select a Board</div>
              )}
              <div className='flex justify-evenly gap-4 text-lg my-2'>
                <button type='button' onClick={() => {
                  if (removedBoardName === '') {
                    setSelectedRemovedBoardName(true);
                  } else {
                    removeBoardFinish(removedBoardName, selectedBoardName, setRemovedBoardName, setIsRemovingBoard, setBoards, setSelectedBoardName, setIsModalOpen);
                    setSelectedRemovedBoardName(false);
                  }
                }} className='w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Remove</button>
                <button type='button' onClick={() => { removeBoardCancel(setIsRemovingBoard, setIsModalOpen) }} className='w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Cancel</button>
              </div>
            </section>
          </section>
        );
      case 'Add Task':
        return (
          <section>
            <h2 className="text-center">New Task</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (isValidTaskDetails(taskDate, taskTime, setValidTaskDateTime)) {
                setValidTaskDateTime(true);
                addTaskFinish(selectedBoardName, taskDate, taskTime, addingTask, newTaskName, setNewTaskName, setAddingTask, setIsModalOpen);
              } else {
                setValidTaskDateTime(false);
              }
            }} className="flex flex-col gap-y-4">
              <input
                type="text"
                placeholder="Enter name"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                required
                className="rounded-full px-4 py-2 bg-light-bg-secondary text-light-text dark:bg-dark-bg-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text"
              />
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                required
                min={getTodaysDate()}
                max={getDateOneYearFromNow()}
                className="rounded-full px-4 py-2 bg-light-bg-secondary text-light-text dark:bg-dark-bg-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text"
              />
              <input
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                required
                className="rounded-full px-4 py-2 bg-light-bg-secondary text-light-text dark:bg-dark-bg-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text"
              />
              {!validTaskDateTime && (
                <div className="text-center">Date or time is invalid.</div>
              )}
              <div className="flex justify-evenly gap-4 text-lg">
                <button type="submit" className="w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text">
                  Add
                </button>
                <button type="button" onClick={() => { addTaskCancel(setAddingTask, setIsModalOpen) }} className="w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text">
                  Cancel
                </button>
              </div>
            </form>
          </section>
        );
      case 'Edit Task':
        return (
          <div>
            <h2>Delete Task</h2>
            <p>Are you sure you want to delete this task?</p>
          </div>
        );
      case 'Delete Task':
        return (
          <div>
            <h2>Delete Task</h2>
            <p>Are you sure you want to delete this task?</p>
          </div>
        );
      default:
        return <div>Unknown Modal Type</div>;
    }
  };

  // No boards created yet.
  if (boards.length === 0 && !isAddingBoard) {
    return (
      <main className='flex flex-col items-center min-h-screen p-2 text-2xl bg-light-bg-primary text-light-text dark:bg-dark-bg-primary dark:text-dark-text'>
        <h1 className='text-4xl text-center'>KanBan Boards</h1>
        <section className='flex flex-1 flex-col justify-center items-center h-full gap-y-2'>
          <h2>Click to add a new board</h2>
          <button onClick={() => { addBoardStart(setIsModalOpen, setModalType, setIsAddingBoard) }} className='flex justify-center items-center px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Add board</button>
        </section>
      </main>
    );
  }

  // User has at least one board created.
  return (
    <main className='flex flex-col min-h-screen bg-light-bg-primary text-light-text dark:bg-dark-bg-primary dark:text-dark-text'>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {renderModal()}
      </Modal>
      <h1 className='text-4xl text-center pt-4'>KanBan Boards</h1>
      <TopBar
        boards={boards}
        selectedBoardName={selectedBoardName}
        onBoardSelect={setSelectedBoardName}
        onAddBoard={() => { addBoardStart(setIsModalOpen, setModalType, setIsAddingBoard) }}
        onDeleteBoard={() => { removeBoardStart(setIsModalOpen, setModalType, setIsRemovingBoard) }}
      />
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
                onTaskAdd={() => { addTaskStart(column.name, setIsModalOpen, setModalType, setAddingTask) }}
                onTaskEdit={(task) => editTaskStart(task, setIsModalOpen, setModalType, setEditingTask)}
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