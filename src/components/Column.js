import React, { Component } from "react";
import Card from "./Card";
import AddCardForm from "./AddCardForm";

class Column extends Component {
  render() {
    const {
      column,
      drag,
      addCard,
      removeColumn,
      removeCard,
      drop,
      dragOver
    } = this.props;

    return (
      <div
        className="wrapper-for-column"
        onDrop={event => drop(event, column.id)}
        onDragOver={event => dragOver(event)}
      >
        <div className="wrap-title">
          <h4>{column.title}</h4>
          <span
            href="#"
            className="close"
            onClick={() => removeColumn(column.id)}
          ></span>
        </div>

        <div className={`columns-wrapper`} id={`${column.id}`}>
          {column.cards.map(card => (
            <Card
              card={card}
              key={card.id}
              drag={drag}
              columnId={column.id}
              removeCard={removeCard}
            />
          ))}
        </div>
        <AddCardForm addCard={addCard} id={column.id} />
      </div>
    );
  }
}

export default Column;
