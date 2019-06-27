import React, { Component } from "react";
import FolderItems from "../FolderItems/FolderItems";

export default class NoteContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  renderFolderName() {
    const folder = this.props.folders.find(
      folder => folder.id === this.props.note.folderId
    );
    return <h2>{folder.name}</h2>;
  }

  render() {
    return (
      <div>
        {this.renderFolderName()}
        <h3>{this.props.note.name}</h3>
        <p>{this.props.note.content}</p>
      </div>
    );
  }
}
// go to list of notes and make them links with Link to /notes/${note.id}

NoteContent.defaultProps = {
  note: [],
  folders: []
};
