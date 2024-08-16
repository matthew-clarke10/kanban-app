import PropTypes from 'prop-types';
import BaseModal from './BaseModal';

const MoveTaskModal = ({ movingTask, movingColumn, selectedBoardName, onClose, setMovingTask, setMovingColumn, moveTaskFinish }) => {
  return (
    <section className='fixed inset-0 flex flex-1 items-center justify-center z-50 bg-black bg-opacity-50 h-0 gap-y-2'>
      <BaseModal
        onClose={onClose}
        title="Move Task"
        confirmButtonText="Move"
        onConfirm={() => {
          moveTaskFinish(selectedBoardName, movingColumn, movingTask, setMovingTask, setMovingColumn, onClose)
        }}
        cancelButtonText="Cancel"
        onCancel={onClose}
      >
        <section className='flex flex-col gap-y-4 justify-between items-center'>
          <button onClick={() => setMovingColumn('Upcoming')} className={`flex justify-center items-center w-full py-4 border-2 text-lg border-light-text dark:border-dark-text ${movingColumn === 'Upcoming' ? 'bg-light-board dark:bg-dark-board' : 'bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-board dark:hover:bg-dark-board hover:opacity-80'}`}>
            <span className={`overflow-hidden text-ellipsis whitespace-nowrap ${movingColumn === 'Upcoming' ? 'bg-light-board dark:bg-dark-board' : ''}`}>Upcoming</span>
          </button>
          <button onClick={() => setMovingColumn('Current')} className={`flex justify-center items-center w-full py-4 border-2 text-lg border-light-text dark:border-dark-text ${movingColumn === 'Current' ? 'bg-light-board dark:bg-dark-board' : 'bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-board dark:hover:bg-dark-board hover:opacity-80'}`}>
            <span className={`overflow-hidden text-ellipsis whitespace-nowrap ${movingColumn === 'Current' ? 'bg-light-board dark:bg-dark-board' : ''}`}>Current</span>
          </button>
          <button onClick={() => setMovingColumn('Finished')} className={`flex justify-center items-center w-full py-4 border-2 text-lg border-light-text dark:border-dark-text ${movingColumn === 'Finished' ? 'bg-light-board dark:bg-dark-board' : 'bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-board dark:hover:bg-dark-board hover:opacity-80'}`}>
            <span className={`overflow-hidden text-ellipsis whitespace-nowrap ${movingColumn === 'Finished' ? 'bg-light-board dark:bg-dark-board' : ''}`}>Finished</span>
          </button>
        </section>
      </BaseModal>
    </section>
  );
};

MoveTaskModal.propTypes = {
  movingTask: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  movingColumn: PropTypes.string.isRequired,
  selectedBoardName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setMovingTask: PropTypes.func.isRequired,
  setMovingColumn: PropTypes.func.isRequired,
  moveTaskFinish: PropTypes.func.isRequired,
};

export default MoveTaskModal;