import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOutsideClick = (e) => {
        console.log('hey');
        if (e.target === e.currentTarget) {
            onClose();
            console.log('hi');
        }
    };

    return (
        <div onClick={handleOutsideClick} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div onClick={(e) => e.stopPropagation()} className="bg-light-bg-primary text-light-text dark:bg-dark-bg-primary dark:text-dark-text p-4 rounded-lg">
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;