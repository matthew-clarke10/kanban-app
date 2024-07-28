import PropTypes from 'prop-types';

const BoardHeader = ({ name }) => {
  return (
    <div>{name}</div>
  );
};

BoardHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BoardHeader;