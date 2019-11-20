import React, { Component } from "react";

class Card extends Component {
  render() {
    const { card, columnId, drag, removeCard } = this.props;
    return (
      <div
        className="card"
        key={card.id}
        id={card.id}
        draggable
        onDrag={event => drag(event, card, columnId)}
      >
        <p className="cardTitle">Title: {card.title}</p>
        <p className="cardTitle">Description: {card.description}</p>

        <span
          href="#"
          className="remove-card"
          onClick={() => removeCard(columnId, card.id)}
        ></span>
      </div>
    );
  }
}

export default Card;
