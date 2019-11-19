import React from "react";

export default class AddCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const cardTitle = this.textInput.value.trim();
    const cardDescription = this.textInputTwo.value.trim();
    if (cardTitle && this.props.addCard) {
      this.props.addCard(cardTitle, cardDescription, this.props.id);
    }
    this.textInput.value = "";
    this.textInputTwo.value = "";
    this.setEditing(false);
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
          <a>Add card</a>
        </div>
      );
    }
    return (
      <form className="card add-card-form" onSubmit={e => this.onSubmit(e)}>
        <input
          type="text"
          className="card-input"
          ref={input => (this.textInput = input)}
          placeholder="Title Card"
        />
        <textarea
          className="card-input"
          ref={input => (this.textInputTwo = input)}
          placeholder="Description Card"
        ></textarea>
        <div>
          <button className="button add-button">Add card</button>
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
