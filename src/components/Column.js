import React, { Component } from "react";
import Card from "./Card";
import AddCardForm from "./AddCardForm";

class Column extends Component {
  render() {
    const {
      column,
      onDrag,
      onAddCard,
      onRemoveColumn,
      onRemoveCard,
      onDrop,
      onDragOver,
      onDragEnter,
      onDragLeave
    } = this.props;

    return (
      <div
        className="wrapper-for-column"
        onDrop={event => onDrop(event, column.id)}
        onDragOver={event => onDragOver(event)}
        onDragEnter={event => onDragEnter(event)}
        onDragLeave={event => onDragLeave(event)}
        // draggable
        // onDrag={event => onDrag(event, column, column.id)}
      >
        <div className="wrap-title">
          <h4>{column.title}</h4>
          <span
            href="#"
            className="close"
            onClick={() => onRemoveColumn(column.id)}
          ></span>
        </div>

        <div className={`columns-wrapper`} id={`${column.id}`}>
          {column.cards.map(card => (
            <Card
              card={card}
              key={card.id}
              onDrag={onDrag}
              columnId={column.id}
              onRemoveCard={onRemoveCard}
            />
          ))}
        </div>
        <AddCardForm onAddCard={onAddCard} id={column.id} />
      </div>
    );
  }
}

export default Column;
