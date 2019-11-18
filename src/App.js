import React from "react";
import Board from "react-trello";

// const data = {};
const handleDragStart = (cardId, laneId) => {
  console.log("drag started");
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log("drag ended");
  console.log(`cardId: ${cardId}`);
  console.log(`sourceLaneId: ${sourceLaneId}`);
  console.log(`targetLaneId: ${targetLaneId}`);
};
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lanes: [
        {
          title: "Backlog",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
          cards: [
            {
              description: "111111111111111111",
              title: "111111111111111111",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            },
            {
              description: "222222222222222",
              title: "222222222222222",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            },
            {
              description: "33333333333333",
              title: "33333333333333",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            }
          ]
        },
        {
          title: "In Dev",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
          cards: [
            {
              description: "1 in DEV",
              title: "1 in DEV",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            },
            {
              description: "2 in DEV",
              title: "2 in DEV",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            }
          ]
        },
        {
          title: "Done",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
          cards: [
            {
              description: "1 DONE",
              title: "1 DONE",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            },
            {
              description: "2 DONE",
              title: "2 DONE",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            },
            {
              description: "3 DONE",
              title: "3 DONE",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            }
          ]
        }
      ]
    };
  }
  // handleCardAdd = (card, laneId) => {
  //   console.log(`New card added to lane ${laneId}`);
  //   console.dir(card);
  // };
  setEventBus = eventBus => {
    console.log("eventBus", eventBus);
    this.setState({ eventBus });
  };

  render() {
    console.log("this.state", this.state);
    console.log("handleDragStart", handleDragStart);
    return (
      <Board
        data={this.state}
        draggable
        editable
        onCardAdd={e => e}
        // onCardAdd={this.handleCardAdd}
        eventBusHandle={this.setEventBus}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      />
    );
  }
}
