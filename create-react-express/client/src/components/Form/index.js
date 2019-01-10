import React from "react";
import './style.css';

// This file exports the Input and FormBtn components

export function Input(props) {
  return (
    <div className="my-form-group">
      <input className="my-form-control" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} className="my-btn">
      {props.children}
    </button>
  );
}
