import PropTypes from 'prop-types';
import BaseModal from './BaseModal';
import { isValidBoardName, addBoardFinish } from '../../utils/boardUtils';

const CreateBoardModal = ({ newBoardName, validBoardName, onClose, setNewBoardName, setValidBoardName, setSelectedBoardName, setIsAddingBoard, setBoards }) => {
  return (
    <section className='fixed inset-0 flex flex-1 items-center justify-center z-50 bg-black bg-opacity-50 h-0 gap-y-2'>
      <BaseModal
        onClose={onClose}
        title="New Board"
        confirmButtonText="Add"
        onConfirm={() => {
          if (isValidBoardName(newBoardName, setValidBoardName)) {
            setValidBoardName(true);
            addBoardFinish(newBoardName, setNewBoardName, setIsAddingBoard, setBoards, setSelectedBoardName, onClose)
          } else {
            setValidBoardName(false);
          }
        }}
        cancelButtonText="Cancel"
        onCancel={onClose}
      >
        <form className='flex flex-col gap-y-4 justify-between items-center'>
          <input
            type="text"
            placeholder="Enter name"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            required
            className="rounded-full w-4/5 px-8 py-3 bg-light-bg-secondary text-base md:text-lg lg:text-xl text-light-text dark:bg-dark-bg-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text"
          />
          {!validBoardName && <div className='text-red-600 text-xl'>The board name is invalid.</div>}
        </form>
      </BaseModal>
    </section>
  );
};

CreateBoardModal.propTypes = {
  newBoardName: PropTypes.string.isRequired,
  validBoardName: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setNewBoardName: PropTypes.func.isRequired,
  setValidBoardName: PropTypes.func.isRequired,
  setSelectedBoardName: PropTypes.func.isRequired,
  setIsAddingBoard: PropTypes.func.isRequired,
  setBoards: PropTypes.func.isRequired,
};

export default CreateBoardModal;