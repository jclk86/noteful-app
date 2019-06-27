import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default function GoBackButton(props) {
  return (
    <div>
      <button onClick={props.history.goBack}>Go Back</button>
    </div>
  );
}
