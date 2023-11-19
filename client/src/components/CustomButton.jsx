import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`inline-flex items-center ${containerStyles}`}
    >
      {title}

      {iconRight && <div className='ml-2'>{iconRight}</div>}
    </button>
  );
};

CustomButton.defaultProps = {
  type: "button",
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  containerStyles: PropTypes.string,
  iconRight: PropTypes.element,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
};

export default CustomButton;