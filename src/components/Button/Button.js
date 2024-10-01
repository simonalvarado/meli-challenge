import React from "react";
import "./Button.scss";

const Button = ({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
