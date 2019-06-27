import React, { Component } from "react";

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: ""
    };
  }
  //
  // two ways to take input value from form below:
  // similar to const { value } = this.state (the "name" prop is the name of the input)
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.setFoldersList(this.state.name, this.state.id);
    this.props.history.goBack();
    console.log(this.props);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>name</label>
          <input
            name="name"
            type="text"
            defaultValue={this.state.name}
            onChange={e => this.change(e)}
          />
          <label>id</label>
          <input
            type="text"
            defaultValue={this.state.id}
            onChange={e => this.setState({ id: e.target.value })}
          />
          <button>Add Folder</button>
        </form>
      </div>
    );
  }
}
AddFolder.defaultProps = {
  folder: {}
};
