import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

export default class Buttons extends Component {
  render() {
    return (
      <div>
        <div>
          <NavLink to="/add-folder/">
            <button>Add Folder</button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/add-note/">
            <button>Add Note</button>
          </NavLink>
        </div>
      </div>
    );
  }
}
