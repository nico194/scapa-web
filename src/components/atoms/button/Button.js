import React from "react";

export default function Button({
  text = "",
  type = "primary",
  position = "center",
  extraClassName = "",
  onClick = () => {},
}) {
  return (
    <div className={`d-flex justify-content-${position} ${extraClassName}`}>
      <button onClick={onClick} className={`btn btn-${type} mb-4`}>
        {text}
      </button>
    </div>
  );
}
