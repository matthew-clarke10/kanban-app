import PropTypes from 'prop-types';
import BaseModal from './BaseModal';

const DeleteBoardModal = ({ boards, deletedBoardName, selectedDeletedBoardName, selectedBoardName, onClose, setSelectedDeletedBoardName, setDeletedBoardName, setIsDeletingBoard, setSelectedBoardName, deleteBoardFinish, setBoards }) => {
  return (
    <section className='fixed inset-0 flex flex-1 items-center justify-center z-50 bg-black bg-opacity-50 h-0 gap-y-2'>
      <BaseModal
        onClose={onClose}
        title="Delete Board"
        confirmButtonText="Delete"
        onConfirm={() => {
          if (deletedBoardName === '') {
            setSelectedDeletedBoardName(true);
          } else {
            deleteBoardFinish(deletedBoardName, selectedBoardName, setDeletedBoardName, setIsDeletingBoard, setBoards, setSelectedBoardName, onClose);
            setSelectedDeletedBoardName(false);
          }
        }}
        cancelButtonText="Cancel"
        onCancel={onClose}
      >
        <section className='flex flex-col gap-y-4 justify-between items-center'>
          <section className={`grid gap-2 w-4/5 ${boards.length < 8 ? 'grid-cols-1' : boards.length < 16 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {boards.map(board => (
              <button key={board.name} onClick={() => setDeletedBoardName(board.name)} title={board.name} className={`flex justify-center items-center w-full py-4 border-2 text-lg border-light-text dark:border-dark-text ${deletedBoardName === board.name ? 'bg-light-board dark:bg-dark-board' : 'bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-board dark:hover:bg-dark-board hover:opacity-80'}`}>
                <span className={`overflow-hidden text-ellipsis whitespace-nowrap ${deletedBoardName === board.name ? 'bg-light-board dark:bg-dark-board' : ''}`}>{board.name}</span>
              </button>
            ))}
          </section>
          {selectedDeletedBoardName && (
            <div className='text-red-600 text-xl'>Select a Board</div>
          )}
        </section>
      </BaseModal>
    </section>
  );
};

DeleteBoardModal.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      tasks: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
  })).isRequired,
  deletedBoardName: PropTypes.string.isRequired,
  selectedDeletedBoardName: PropTypes.bool.isRequired,
  selectedBoardName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setSelectedDeletedBoardName: PropTypes.func.isRequired,
  setDeletedBoardName: PropTypes.func.isRequired,
  setIsDeletingBoard: PropTypes.func.isRequired,
  setSelectedBoardName: PropTypes.func.isRequired,
  deleteBoardFinish: PropTypes.func.isRequired,
  setBoards: PropTypes.func.isRequired,
};

export default DeleteBoardModal;