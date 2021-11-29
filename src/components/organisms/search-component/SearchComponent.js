import React from "react";

export default function SearchComponent({
  inputPlaceholder,
  buttonText,
  onHandleChange,
  onHandleClick,
}) {
  return (
    <div className="w-100 d-flex flex-row justify-content-start mb-4 ml-4">
      <input
        type="text"
        style={{ height: 38 }}
        className="form-control p-1 w-50"
        placeholder={inputPlaceholder}
        onChange={onHandleChange}
      />
      <button
        onClick={onHandleClick}
        style={{ marginLeft: "1.5rem" }}
        className="btn btn-primary mb-4"
      >
        {buttonText}
      </button>
    </div>
  );
}
