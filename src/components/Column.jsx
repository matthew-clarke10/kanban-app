import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { convertTimeTo12Hour, formatDate } from '../utils/dateTimeUtils';
import { moveTask } from '../utils/taskUtils';

const Column = ({ board, column, selectedColumnName, setSelectedColumnName, onAddTask, onEditTask }) => {
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 1024px)").matches);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [board]);

  const sortTasksByDateTime = (tasks) => {
    return tasks.slice().sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time).getTime();
      const dateB = new Date(b.date + ' ' + b.time).getTime();
      return dateA - dateB;
    });
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("application/json", JSON.stringify(task));
    setSelectedColumnName(column.name);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("application/json"));
    moveTask(board, column.name, task, setSelectedColumnName, selectedColumnName);
  };

  const sortedTasks = sortTasksByDateTime(column.tasks);

  if (!isMobile || selectedColumnName === column.name) {
    return (
      <section className='flex flex-col flex-1 h-full bg-light-bg-primary dark:bg-dark-bg-primary' onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onDragEnter={handleDragEnter}>
        <section className='h-1/5'>
          <h2
            className={`flex justify-center items-center h-3/5 text-center py-2 sm:py-4 text-xl sm:text-3xl ${column.name === 'Upcoming' ? 'bg-red-400 dark:bg-red-600' : column.name === 'Current' ? 'bg-yellow-300 dark:bg-yellow-500' : 'bg-cyan-300 dark:bg-cyan-500'}`}
            onClick={() => isMobile && setSelectedColumnName(column.name)}
          >
            {column.name}
          </h2>
          <button onClick={() => onAddTask()} className='h-2/5 bg-lime-300 hover:bg-lime-400 dark:bg-lime-600 dark:hover:bg-lime-700 w-full py-1 sm:py-2 text-base sm:text-xl border-y-2 border-light-text dark:border-dark-text'>Add</button>
        </section>
        <section className={`flex flex-col ${sortedTasks.length === 0 ? 'justify-center items-center' : ''} flex-1 h-4/5`}>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <button
                key={task.id}
                className={`cursor-grab flex bg-light-bg-faded dark:bg-dark-bg-faded border-b-2 border-light-text dark:border-dark-text bg-light-bg-secondary dark:bg-dark-bg-secondary`}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => onEditTask(task)}
              >
                <div className='flex flex-col justify-between px-1 gap-y-2 w-full text-xl hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary'>
                  <div className='h-7 overflow-hidden text-start'>
                    {task.name}
                  </div>
                  <div className='flex items-end font-bold'>{formatDate(task.date)}, {convertTimeTo12Hour(task.time)}</div>
                </div>
              </button>
            ))
          ) : (
            <div className='flex justify-center items-center h-full w-1/2 text-center text-2xl'>{column.name === 'Upcoming' ? 'No upcoming tasks. Yay!' : column.name === 'Current' ? 'No current tasks. Yay!' : column.name === 'Finished' ? 'You have not finished any tasks yet...' : 'No tasks. Create a new task or drag another task to this column.'}</div>
          )}
        </section>
      </section>
    );
  } else {
    return (
      <section className='bg-light-bg-primary dark:bg-dark-bg-primary' onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onDragEnter={handleDragEnter}>
        <h2
          className={`text-center py-2 sm:py-4 text-xl sm:text-3xl ${column.name === 'Upcoming' ? 'bg-red-400 hover:bg-red-500 md:hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:md:hover:bg-red-600' : column.name === 'Current' ? 'bg-yellow-300 hover:bg-yellow-400 md:hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:md:hover:bg-yellow-500' : 'bg-cyan-300 hover:bg-cyan-400 md:hover:bg-cyan-300 dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:md:hover:bg-cyan-500'} hover:cursor-pointer`}
          onClick={() => isMobile && setSelectedColumnName(column.name)}
        >
          {column.name}
        </h2>
      </section>
    );
  }
};

Column.propTypes = {
  board: PropTypes.string.isRequired,
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
  onEditTask: PropTypes.func.isRequired,
};

export default Column;
