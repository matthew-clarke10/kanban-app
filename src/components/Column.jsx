import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { convertTimeTo12Hour, formatDate } from '../utils/dateTimeUtils';

const Column = ({ column, selectedColumnName, setSelectedColumnName, onAddTask, onTaskEdit, onTaskDelete, onTaskMove }) => {
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

  const sortTasksByDateTime = (tasks) => {
    return tasks.slice().sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time).getTime();
      const dateB = new Date(b.date + ' ' + b.time).getTime();
      return dateA - dateB;
    });
  };

  const sortedTasks = sortTasksByDateTime(column.tasks);

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
          <button onClick={() => onAddTask()} className='bg-green-400 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-800 w-full py-1 sm:py-2 text-base sm:text-xl border-y-2 border-light-text dark:border-dark-text'>Create</button>
        </section>
        <section className='flex flex-col flex-1'>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <div key={task.id} className={`flex flex-col justify-center h-24 bg-light-bg-faded dark:bg-dark-bg-faded border-b-2 border-light-text dark:border-dark-text bg-light-bg-secondary dark:bg-dark-bg-secondary`} onMouseOver={() => handleMouseOver(task)} onMouseOut={handleMouseOut}>
                <div className={`flex justify-between items-center ${hoveredTask === task ? 'h-16' : 'h-auto gap-4'}`}>
                  <div className={`flex flex-1 items-center pl-2 ${hoveredTask === task ? 'text-lg' : 'text-xl md:text-lg lg:text-xl xl:text-2xl'} h-full`}>{task.name}</div>
                  <div className='flex justify-center items-center w-28 h-full'>
                    <div className={`flex flex-col justify-center items-center text-center font-bold ${hoveredTask === task ? 'text-lg' : 'text-xl md:text-lg lg:text-xl xl:text-2xl'} w-full h-full`}>
                      <div className='flex justify-center items-center w-full h-full'>{formatDate(task.date)}</div>
                      <div className='flex justify-center items-center w-full h-full'>{convertTimeTo12Hour(task.time)}</div>
                    </div>
                  </div>
                </div>
                {hoveredTask === task && (
                  <div className='flex w-full h-8 text-xl border-t-2 border-light-text dark:border-dark-text'>
                    <button
                      className='flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-700 dark:hover:bg-yellow-800 text-black dark:text-white py-1 px-2 w-full h-full border-r-2 border-light-text dark:border-dark-text'
                      onClick={() => onTaskMove(task)}
                    >
                      Move
                    </button>
                    <button
                      className='flex justify-center items-center bg-blue-400 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 text-black dark:text-white py-1 px-2 w-full h-full'
                      onClick={() => onTaskEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className='flex justify-center items-center bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-black dark:text-white py-1 px-2 w-full h-full border-l-2 border-light-text dark:border-dark-text'
                      onClick={() => onTaskDelete(task)}
                    >
                      Delete
                    </button>
                  </div>
                )}
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
          className={`py-2 sm:py-4 text-xl sm:text-3xl ${column.name === 'Upcoming' ? 'bg-red-400 hover:bg-red-500 md:hover:bg-red-400 dark:bg-cyan-700 dark:hover:bg-cyan-800 dark:md:hover:bg-cyan-700' : column.name === 'Current' ? 'bg-orange-400 hover:bg-orange-500 md:hover:bg-orange-400 dark:bg-blue-700 dark:hover:bg-blue-800 dark:md:hover:bg-blue-700' : 'bg-yellow-400 hover:bg-yellow-500 md:hover:bg-yellow-400 dark:bg-purple-800 dark:hover:bg-purple-900 dark:md:hover:bg-purple-800'}`}
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
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  selectedColumnName: PropTypes.string.isRequired,
  setSelectedColumnName: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskMove: PropTypes.func.isRequired,
};


export default Column;