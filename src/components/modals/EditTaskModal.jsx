import PropTypes from 'prop-types';
import BaseModal from './BaseModal';
import { isValidTaskDetails, saveTask, deleteTask } from '../../utils/taskUtils';
import { getTodaysDate, getDateOneYearFromNow } from '../../utils/dateTimeUtils';

const EditTaskModal = ({ editingTask, editingColumn, validTaskDateTime, selectedBoardName, onClose, setEditingTask, setEditingColumn, setValidTaskDateTime }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidTaskDetails(editingTask.name, editingTask.date, editingTask.time, setValidTaskDateTime)) {
      setValidTaskDateTime(true);
      saveTask(selectedBoardName, editingColumn, editingTask, setEditingTask, setEditingColumn, onClose);
    } else {
      setValidTaskDateTime(false);
    }
  }

  return (
    <section className='fixed inset-0 flex flex-1 items-center justify-center z-50 bg-black bg-opacity-50 h-0 gap-y-2'>
      <BaseModal
        onClose={onClose}
        title="Edit Task"
        confirmButtonText="Save"
        onConfirm={handleSubmit}
        cancelButtonText="Delete"
        onCancel={() => { deleteTask(selectedBoardName, editingColumn, editingTask, setEditingTask, setEditingColumn, onClose) }}
      >
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 justify-between items-center'>
          <input
            type="text"
            placeholder="Enter name"
            value={editingTask.name}
            onChange={(e) => setEditingTask(prevTask => ({ ...prevTask, name: e.target.value }))}
            required
            className="rounded-full w-4/5 px-8 py-3 bg-light-bg-secondary text-light-text dark:bg-dark-bg-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text"
          />
          <input
            type="date"
            value={editingTask.date}
            onChange={(e) => setEditingTask(prevTask => ({ ...prevTask, date: e.target.value }))}
            required
            min={getTodaysDate()}
            max={getDateOneYearFromNow()}
            className="rounded-full w-4/5 px-8 py-3 bg-light-bg-secondary text-light-text dark:bg-dark-bg-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text"
          />
          <input
            type="time"
            value={editingTask.time}
            onChange={(e) => setEditingTask(prevTask => ({ ...prevTask, time: e.target.value }))}
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

EditTaskModal.propTypes = {
  editingTask: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  editingColumn: PropTypes.string.isRequired,
  validTaskDateTime: PropTypes.bool.isRequired,
  selectedBoardName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setEditingTask: PropTypes.func.isRequired,
  setEditingColumn: PropTypes.func.isRequired,
  setValidTaskDateTime: PropTypes.func.isRequired,
};

export default EditTaskModal;