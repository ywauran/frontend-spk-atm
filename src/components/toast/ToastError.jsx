import React from "react";

const ToastError = ({ message }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="font-semibold text-white alert alert-error">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ToastError;
