import PropTypes from 'prop-types';

const CreateBoardModal = ({ newBoardName, validBoardName, isValidBoardName, setValidBoardName, addBoardFinish, addBoardCancel, setNewBoardName, setIsAddingBoard, setBoards, setSelectedBoardName, setIsModalOpen }) => {
  return (
    <section className='flex flex-1 flex-col justify-center items-center h-full gap-y-2'>
      <h2>New Board</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (isValidBoardName(newBoardName, setValidBoardName)) {
          setValidBoardName(true);
          addBoardFinish(newBoardName, setNewBoardName, setIsAddingBoard, setBoards, setSelectedBoardName, setIsModalOpen);
        } else {
          setValidBoardName(false);
        }
      }}
        className='flex flex-col gap-y-4'>
        <input
          type="text"
          placeholder="Enter name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          required
          className='rounded-full px-4 py-2 bg-light-bg-secondary text-light-text dark:bg-dark-bg-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text'
        />
        {!validBoardName && (
          <div className='text-center'>Name is Taken</div>
        )}
        <div className='flex justify-evenly gap-4 text-lg'>
          <button type='submit' className='w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Save</button>
          <button type='button' onClick={() => { addBoardCancel(setIsAddingBoard, setIsModalOpen) }} className='w-28 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>Cancel</button>
        </div>
      </form>
    </section>
  );
};

CreateBoardModal.propTypes = {
  newBoardName: PropTypes.string.isRequired,
  validBoardName: PropTypes.bool.isRequired,
  isValidBoardName: PropTypes.func.isRequired,
  setValidBoardName: PropTypes.func.isRequired,
  addBoardFinish: PropTypes.func.isRequired,
  addBoardCancel: PropTypes.func.isRequired,
  setNewBoardName: PropTypes.func.isRequired,
  setIsAddingBoard: PropTypes.func.isRequired,
  setBoards: PropTypes.func.isRequired,
  setSelectedBoardName: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default CreateBoardModal;