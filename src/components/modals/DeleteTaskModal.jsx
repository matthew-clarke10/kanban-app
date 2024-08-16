import PropTypes from 'prop-types';
import BaseModal from './BaseModal';

const DeleteTaskModal = ({ editingTask, editingColumn, selectedBoardName, onClose, setEditingTask, setEditingColumn, deleteTaskFinish }) => {
  return (
    <section className='fixed inset-0 flex flex-1 items-center justify-center z-50 bg-black bg-opacity-50 h-0'>
      <BaseModal
        onClose={onClose}
        title="Delete Task"
        confirmButtonText="Delete"
        onConfirm={() => deleteTaskFinish(selectedBoardName, editingColumn, editingTask, setEditingTask, setEditingColumn, onClose)}
        cancelButtonText="Cancel"
        onCancel={onClose}
      >
        <h3 className='mx-auto text-xl text-center w-3/5'>Are you sure you want to delete this task?</h3>
      </BaseModal>
    </section>
  );
};

DeleteTaskModal.propTypes = {
  editingTask: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  editingColumn: PropTypes.string.isRequired,
  selectedBoardName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setEditingTask: PropTypes.func.isRequired,
  setEditingColumn: PropTypes.func.isRequired,
  deleteTaskFinish: PropTypes.func.isRequired,
};

export default DeleteTaskModal;