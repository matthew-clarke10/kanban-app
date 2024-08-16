import PropTypes from 'prop-types';

const BaseModal = ({ onClose, title, children, confirmButtonText, onConfirm, cancelButtonText, onCancel }) => {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleOutsideClick} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col justify-evenly gap-y-6 md:gap-y-12 bg-light-bg-primary text-light-text dark:bg-dark-bg-primary dark:text-dark-text p-8 min-w-64 md:min-w-80 lg:min-w-96 rounded-lg">
        <h2 className='text-3xl text-center my-2'>{title}</h2>
        {children}
        <div className='flex justify-evenly gap-4 md:gap-8 text-base md:text-xl px-8 my-2'>
          {onCancel && (
            <button onClick={onCancel} className='w-24 md:w-32 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>
              {cancelButtonText || 'Cancel'}
            </button>
          )}
          {onConfirm && (
            <button onClick={onConfirm} className='w-24 md:w-32 px-3 py-2 rounded-lg border-2 border-light-text dark:border-dark-text'>
              {confirmButtonText || 'Confirm'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

BaseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  confirmButtonText: PropTypes.string,
  onConfirm: PropTypes.func,
  cancelButtonText: PropTypes.string,
  onCancel: PropTypes.func,
};

export default BaseModal;