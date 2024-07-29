import PropTypes from 'prop-types';
import { useState } from 'react';

const Column = ({ column, tasks, onAddTask, onTaskEdit, onTaskDelete, onTaskMove }) => {
  const [hoveredTask, setHoveredTask] = useState(null);

  const handleMouseOver = (task) => {
    setHoveredTask(task);
  };

  const handleMouseOut = () => {
    setHoveredTask(null);
  };

  return (
    <>
      <section className='bg-light-bg-secondary dark:bg-dark-bg-secondary text-center border-y-2 border-light-text dark:border-dark-text'>
        <h2 className='py-2 sm:py-4 text-xl sm:text-3xl'>{column}</h2>
        <button className='bg-green-400 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-800 w-full py-1 sm:py-2 text-base sm:text-xl border-t-2 border-light-text dark:border-dark-text'>Create</button>
      </section>
      <section className='flex flex-col flex-1'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.name} className='flex justify-between items-center h-16 bg-light-bg-faded dark:bg-dark-bg-faded border-b-2 border-light-text dark:border-dark-text hover:cursor-grab hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary' onMouseOver={() => handleMouseOver(task)} onMouseOut={handleMouseOut}>
              <div className='flex flex-1 items-center pl-2 h-full'>{task.name}</div>
              <div className='flex justify-center items-center w-16 h-full'>
                {hoveredTask !== task && (
                  <div className='flex justify-center items-center w-full h-full'>{task.time}</div>
                )}
                {hoveredTask === task && (
                  <div className='flex flex-col'>
                    <button
                      className='bg-blue-400 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 text-black dark:text-white py-1 px-2 w-16 h-1/2'
                      onClick={() => onTaskEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className='bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-black dark:text-white py-1 px-2 w-16 h-1/2'
                      onClick={() => onTaskDelete(task)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </section>
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