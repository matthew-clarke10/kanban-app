import PropTypes from 'prop-types';
import { IoIosAdd } from "react-icons/io";

const TopBar = ({ boards, onBoardSelect, onAddBoard }) => {
  return (
    <nav className='flex items-center min-h-8 gap-x-1 my-4'>
      <h2 className='mr-2'>Boards: </h2>
      {boards.map(board => (
        <button key={board.name} onClick={() => onBoardSelect(board)} className='flex justify-center items-center min-w-12 p-1 rounded-lg border-2 text-sm border-light-text dark:border-dark-text'>
          {board.name}
        </button>
      ))}
      <button onClick={onAddBoard} className='flex justify-center items-center min-w-8 rounded-lg border-2 border-light-text dark:border-dark-text'>
        <IoIosAdd size='28' />
      </button>
    </nav>
  );
};

TopBar.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  onBoardSelect: PropTypes.func.isRequired,
  onAddBoard: PropTypes.func.isRequired,
};

export default TopBar;