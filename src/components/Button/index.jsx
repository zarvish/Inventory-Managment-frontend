import React from "react";
import "./style.scss";

const Button = ({ title, type, icon, onClick }) => {
  let className = "outlined-btn"; // Default button style

  switch (type) {
    case "filled":
      className = "filled-btn";
      break;
    case "ghost":
      className = "ghost-btn";
      break;
    case "icon":
      className = "ghost-btn";
      return <button className={className}>{icon}</button>;
    default:
      break;
  }

  return (
    <button onClick={(e) => onClick(e)} className={className}>
      {title}
    </button>
  );
};

export default Button;
