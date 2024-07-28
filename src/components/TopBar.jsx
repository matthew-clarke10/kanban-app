import PropTypes from 'prop-types';
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

const TopBar = ({ boards, selectedBoardName, onBoardSelect, onAddBoard, onDeleteBoard }) => {
  return (
    <nav className='flex items-center flex-wrap min-h-8 gap-2 p-4 border-b-2 border-light-text dark:border-dark-text'>
      {boards.map(board => (
        <button key={board.name} onClick={() => onBoardSelect(board)} title={board.name} className={`flex justify-center items-center w-24 p-1 rounded-lg border-2 text-xs border-light-text dark:border-dark-text ${selectedBoardName === board.name ? 'bg-light-board dark:bg-dark-board' : 'bg-light-bg-faded dark:bg-dark-bg-faded hover:bg-light-board dark:hover:bg-dark-board hover:opacity-80'}`}>
          <span className={`overflow-hidden text-ellipsis whitespace-nowrap ${selectedBoardName === board.name ? 'bg-light-board dark:bg-dark-board' : ''}`}>{board.name}</span>
        </button>
      ))}
      <button onClick={onAddBoard} className='flex justify-center items-center min-w-7 rounded-lg border-2 border-light-text dark:border-dark-text bg-light-bg-faded dark:bg-dark-bg-faded hover:bg-light-bg dark:hover:bg-dark-bg'>
        <IoIosAdd size='24' />
      </button>
      <button onClick={onDeleteBoard} className='flex justify-center items-center min-w-7 rounded-lg border-2 border-light-text dark:border-dark-text bg-light-bg-faded dark:bg-dark-bg-faded hover:bg-light-bg dark:hover:bg-dark-bg'>
        <FiMinus size='24' />
      </button>
    </nav>
  );
};

TopBar.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  selectedBoardName: PropTypes.string.isRequired,
  onBoardSelect: PropTypes.func.isRequired,
  onAddBoard: PropTypes.func.isRequired,
  onDeleteBoard: PropTypes.func.isRequired,
};

export default TopBar;