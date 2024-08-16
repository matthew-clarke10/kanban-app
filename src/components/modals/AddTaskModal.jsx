import PropTypes from 'prop-types';
import BaseModal from './BaseModal';

const AddTaskModal = ({ addingTask, newTaskName, taskDate, taskTime, validTaskDateTime, selectedBoardName, onClose, setAddingTask, setNewTaskName, setTaskDate, setTaskTime, isValidTaskDetails, setValidTaskDateTime, addTaskFinish, getTodaysDate, getDateOneYearFromNow }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidTaskDetails(newTaskName, taskDate, taskTime, setValidTaskDateTime)) {
      setValidTaskDateTime(true);
      addTaskFinish(selectedBoardName, taskDate, taskTime, addingTask, newTaskName, setNewTaskName, setAddingTask, onClose);
    } else {
      setValidTaskDateTime(false);
    }
  }

  return (
    <section className='fixed inset-0 flex flex-1 items-center justify-center z-50 bg-black bg-opacity-50 h-0 gap-y-2'>
      <BaseModal
        onClose={onClose}
        title="New Task"
        confirmButtonText="Add"
        onConfirm={handleSubmit}
        cancelButtonText="Cancel"
        onCancel={onClose}
      >
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 justify-between items-center'>
          <input
            type="text"
            placeholder="Enter name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            required
            className="rounded-full w-4/5 px-8 py-3 bg-light-bg-secondary text-light-text dark:bg-dark-bg-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text"
          />
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            required
            min={getTodaysDate()}
            max={getDateOneYearFromNow()}
            className="rounded-full w-4/5 px-8 py-3 bg-light-bg-secondary text-light-text dark:bg-dark-bg-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text"
          />
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            required
            className="rounded-full w-4/5 px-8 py-3 bg-light-bg-secondary text-light-text dark:bg-dark-bg-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text"
          />
          {!validTaskDateTime && (
            <div className='text-red-600 text-xl'>The task details are invalid.</div>
          )}
        </form>
      </BaseModal>
    </section>
  );
};

AddTaskModal.propTypes = {
  addingTask: PropTypes.string.isRequired,
  newTaskName: PropTypes.string.isRequired,
  taskDate: PropTypes.string.isRequired,
  taskTime: PropTypes.string.isRequired,
  validTaskDateTime: PropTypes.bool.isRequired,
  selectedBoardName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setAddingTask: PropTypes.func.isRequired,
  setNewTaskName: PropTypes.func.isRequired,
  setTaskDate: PropTypes.func.isRequired,
  setTaskTime: PropTypes.func.isRequired,
  isValidTaskDetails: PropTypes.func.isRequired,
  setValidTaskDateTime: PropTypes.func.isRequired,
  addTaskFinish: PropTypes.func.isRequired,
  getTodaysDate: PropTypes.func.isRequired,
  getDateOneYearFromNow: PropTypes.func.isRequired,
};

export default AddTaskModal;