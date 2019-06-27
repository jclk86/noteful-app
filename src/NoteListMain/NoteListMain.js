import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./NoteListMain.css";
export default class NoteListMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: this.props.notes.length
    };
  }

  render() {
    return (
      <section>
        <ul>
          {this.props.notes.map(note => (
            <li key={note.id}>
              <h3>
                <NavLink to={`/note/${note.id}`} className="no-change">
                  {note.name}
                </NavLink>
              </h3>
              <p>{note.modified}</p>
              <button onClick={e => this.props.deleteNote(note)}>Delete</button>
            </li>
          ))}
          {this.state.length}
        </ul>
      </section>
    );
  }
}

NoteListMain.defaultProps = {
  notes: []
};
