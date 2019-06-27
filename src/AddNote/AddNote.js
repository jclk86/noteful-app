import React, { Component } from "react";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", content: "", id: "" };
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.setNotesList(this.state.name, this.state.content, this.state.id);
    this.props.history.goBack();
    console.log(this.props);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>Name: </label>
        <input
          name="name"
          type="text"
          defaultValue={this.state.name}
          onChange={e => this.change(e)}
        />
        <label>Content: </label>
        <input
          name="content"
          type="text"
          defaultValue={this.state.content}
          onChange={e => this.change(e)}
        />
        <label>Id: </label>
        <input
          name="id"
          type="text"
          defaultValue={this.state.id}
          onChange={e => this.change(e)}
        />
        <input type="submit" />
      </form>
    );
  }
}
