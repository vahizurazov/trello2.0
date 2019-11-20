import React, { Component } from "react";

export default class AddColumnForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const colunmTitle = this.textInput.value.trim();
    if (colunmTitle && this.props.onAdd) {
      this.props.onAdd(colunmTitle);
    }
    this.textInput.value = "";
  }

  setEditing(editing) {
    this.setState({
      editing
    });
  }

  render() {
    if (!this.state.editing) {
      return (
        <div className="open-add-button" onClick={() => this.setEditing(true)}>
          <a href="#">Add column</a>
        </div>
      );
    }
    return (
      <form className="add-column-form" onSubmit={e => this.onSubmit(e)}>
        <input
          type="text"
          className="column-input"
          ref={input => (this.textInput = input)}
          aria-label="Add a column"
        />
        <div>
          <button className="button add-button">Add column</button>
          <button
            className="button cancel-button"
            onClick={() => this.setEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}
