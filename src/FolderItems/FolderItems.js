import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./FolderItems.css";

// code here and in app.js renders folder list navs for both  "/" and all "/folder/:parameter" pages
export default class FolderItems extends Component {
  countNotesForFolder = (notes = [], folderId) =>
    notes.filter(note => note.folderId === folderId).length;

  render() {
    return (
      <ul>
        {this.props.folders.map(folder => (
          <li key={folder.id}>
            <h3>
              <NavLink
                to={`/folder/${folder.id}`}
                className="folderList"
                exact
                activeClassName="activeLink"
              >
                {folder.name}
                <p className="NoteListNav__num-notes">
                  {this.countNotesForFolder(this.props.notes, folder.id)}
                </p>
              </NavLink>
            </h3>
          </li>
        ))}
      </ul>
    );
  }
}
