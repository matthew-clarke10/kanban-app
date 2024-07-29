import PropTypes from 'prop-types';

const Column = ({ column, tasks, onAddTask, onTaskEdit, onTaskDelete, onTaskMove }) => {
  return (
    <>
      <h2 className='bg-dark-bg-secondary text-3xl text-center py-4 border-y-2 border-light-text dark:border-dark-text'>{column}</h2>
    </>
  );
};

Column.propTypes = {
  column: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  })).isRequired,
  onAddTask: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskMove: PropTypes.func.isRequired,
};


export default Column;