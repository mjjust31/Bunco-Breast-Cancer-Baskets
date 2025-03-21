import React from 'react';

const Button = ({ type = 'button', onClick, className, disabled, style, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${className}`} // You can add custom styles from the parent component
      disabled={disabled}
      style={style}
    >
      {children} {/* This is the text that will appear inside the button */}
    </button>
  );
};

export default Button;
