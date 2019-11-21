import React, { Component } from "react";

class Card extends Component {
  render() {
    const { card, columnId, onDrag, onRemoveCard } = this.props;
    return (
      <div
        className="card"
        key={card.id}
        id={card.id}
        draggable
        onDrag={event => onDrag(event, card, columnId)}
      >
        <p className="card-title">Title: {card.title}</p>
        <p className="card-title">Description: {card.description}</p>

        <span
          href="#"
          className="remove-card"
          onClick={() => onRemoveCard(columnId, card.id)}
        ></span>
      </div>
    );
  }
}

export default Card;
