import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Column = ({ column, selectedColumnName, setSelectedColumnName, onStartAddingTask, onTaskEdit, onTaskDelete, onTaskMove }) => {
  const [hoveredTask, setHoveredTask] = useState(null);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseOver = (task) => {
    setHoveredTask(task);
  };

  const handleMouseOut = () => {
    setHoveredTask(null);
  };

  if (!isMobile || selectedColumnName === column.name) {
    return (
      <>
        <section className='bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-center'>
          <h2
            className={`py-2 sm:py-4 text-xl sm:text-3xl ${column.name === 'Upcoming' ? 'bg-red-400 dark:bg-cyan-700' : column.name === 'Current' ? 'bg-orange-400 dark:bg-blue-700' : 'bg-yellow-400 dark:bg-purple-800'}`}
            onClick={() => isMobile && setSelectedColumnName(column.name)}
          >
            {column.name}
          </h2>
          <button onClick={() => onStartAddingTask()} className='bg-green-400 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-800 w-full py-1 sm:py-2 text-base sm:text-xl border-y-2 border-light-text dark:border-dark-text'>Create</button>
        </section>
        <section className='flex flex-col flex-1'>
          {column.tasks.length > 0 ? (
            column.tasks.map((task) => (
              <div key={task.name} className='flex justify-between items-center h-16 bg-light-bg-faded dark:bg-dark-bg-faded border-b-2 border-light-text dark:border-dark-text hover:cursor-grab bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary' onMouseOver={() => handleMouseOver(task)} onMouseOut={handleMouseOut}>
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
  } else {
    return (
      <section className='bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-center'>
        <h2
          className={`py-2 sm:py-4 text-xl sm:text-3xl ${column.name === 'Upcoming' ? 'bg-red-400 dark:bg-cyan-700' : column.name === 'Current' ? 'bg-orange-400 dark:bg-blue-700' : 'bg-yellow-400 dark:bg-purple-800'}`}
          onClick={() => isMobile && setSelectedColumnName(column.name)}
        >
          {column.name}
        </h2>
      </section>
    );
  }
};

Column.propTypes = {
  column: PropTypes.shape({
    name: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  selectedColumnName: PropTypes.string.isRequired,
  setSelectedColumnName: PropTypes.func.isRequired,
  onStartAddingTask: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskMove: PropTypes.func.isRequired,
};


export default Column;