import React, { Component } from "react";
import AddColumnForm from "./components/AddColumnForm";
import Column from "./components/Column";

import { socketInstance } from "./network";

import "./style/Board.css";

console.log(socketInstance);

let oldColunmId = [];
let indexCard = [];
let draggedCard = [];

class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      revision: 0
      // columns: [
      //   {
      //     title: "Backlog",
      //     id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      //     cards: [
      //       {
      //         title: "First Backlog",
      //         description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
      //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
      //           36
      //         )
      //       },
      //       {
      //         title: "Second Backlog",
      //         description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
      //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
      //           36
      //         )
      //       },
      //       {
      //         title: "Third Backlog",
      //         description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
      //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
      //           36
      //         )
      //       }
      //     ]
      //   },
      //   {
      //     title: "In Dev",
      //     id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      //     cards: [
      //       {
      //         title: "1 in DEV",
      //         description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
      //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
      //           36
      //         )
      //       },
      //       {
      //         title: "2 in DEV",
      //         description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
      //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
      //           36
      //         )
      //       }
      //     ]
      //   },
      //   {
      //     title: "Done",
      //     id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      //     cards: [
      //       {
      //         title: "1 DONE",
      //         description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
      //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
      //           36
      //         )
      //       },
      //       {
      //         title: "2 DONE",
      //         description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
      //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
      //           36
      //         )
      //       },
      //       {
      //         title: "3 DONE",
      //         description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
      //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
      //           36
      //         )
      //       }
      //     ]
      //   }
      // ],
      // draggedCard: {}
    };
  }

  componentDidMount() {
    socketInstance.once("trello.init", state => {
      console.log("state", state);
      if (this.state.revision < state.revision) {
        this.setState(state);
      }
    });

    socketInstance.on("trello.change", state => {
      if (this.state.revision < state.revision) {
        console.log("THIS STATE CHANGED", state);
        this.setState(state);
      }
    });
  }

  componentDidUpdate() {
    socketInstance.emit("trello.modify", this.state);
  }

  addColumn(title) {
    this.setState(prevState => ({
      columns: prevState.columns.concat({
        title,
        id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
        cards: []
      })
    }));
  }
  removeColumn = id => {
    this.setState(prevState => ({
      revision: this.state.revision + 1,
      columns: prevState.columns.filter(item => item.id !== id)
    }));
  };

  addCard = (title, description, id) => {
    console.log(this);
    const card = {
      title,
      description,
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
    };
    const itemIndex = this.state.columns.findIndex(item => item.id === id);
    this.setState(prevState => {
      this.state.columns[itemIndex].cards.push(card);
      return {
        revision: this.state.revision + 1,
        columns: this.state.columns
      };
    });
  };
  removeCard = (columnId, cardId) => {
    const { columns } = this.state;
    const columnIndex = columns.findIndex(el => el.id === columnId);
    const filteredCards = columns[columnIndex].cards.filter(
      el => el.id !== cardId
    );
    const updatedColumn = { ...columns[columnIndex], cards: filteredCards };
    const filteredcolumns = columns.filter(el => el.id !== columnId);
    filteredcolumns.splice(columnIndex, 0, updatedColumn);
    this.setState({
      revision: this.state.revision + 1,
      columns: filteredcolumns
    });
  };

  onDrag = (event, card, columnId) => {
    // event.preventDefault();
    oldColunmId = columnId;
    draggedCard = card;
  };

  onDrop = (event, columnId) => {
    event.preventDefault();
    const { columns } = this.state;
    const colIndex = columns.findIndex(col => col.id === columnId);
    const newCardIndex = columns[colIndex].cards.findIndex(
      card => card.id === indexCard
    );
    if (event.target.className === "card") {
      event.target.style.background = "";
      const columnIndex = columns.findIndex(el => el.id === oldColunmId);
      const filteredCards = columns[columnIndex].cards.filter(
        el => el.id !== draggedCard.id
      );
      const updatedColumn = { ...columns[columnIndex], cards: filteredCards };
      const filteredcolumns = columns.filter(el => el.id !== oldColunmId);
      filteredcolumns.splice(columnIndex, 0, updatedColumn);

      const newColumnIndex = filteredcolumns.findIndex(
        col => col.id === columnId
      );

      filteredcolumns[newColumnIndex].cards.splice(
        newCardIndex,
        0,
        draggedCard
      );
      // this.setState({ columns: null }, () => {
      //   this.socket.emit("new state", {
      //     columns: filteredcolumns,
      //     draggedCard: {}
      //   });
      // });
      this.setState({
        revision: this.state.revision + 1,
        columns: filteredcolumns
        // draggedCard: {}
      });
    }
    if (event.target.className === "columns-wrapper") {
      event.target.style.background = "";
      const columnIndex = columns.findIndex(el => el.id === oldColunmId);
      const filteredCards = columns[columnIndex].cards.filter(
        el => el.id !== draggedCard.id
      );
      const updatedColumn = { ...columns[columnIndex], cards: filteredCards };
      const filteredcolumns = columns.filter(el => el.id !== oldColunmId);
      filteredcolumns.splice(columnIndex, 0, updatedColumn);
      const newColumnIndex = filteredcolumns.findIndex(
        col => col.id === columnId
      );
      filteredcolumns[newColumnIndex].cards.push(draggedCard);
      this.setState({
        revision: this.state.revision + 1,
        columns: filteredcolumns
      });
    }
  };

  onDragOver = event => {
    event.preventDefault();
  };
  onDragEnter = event => {
    if (event.target.className === "card") {
      event.target.style.background = "#2398ef";
      indexCard = event.target.getAttribute("id");
    }
  };
  onDragLeave = event => {
    if (event.target.className === "card") {
      event.target.style.background = "";
    }
  };

  render() {
    const { columns } = this.state;
    if (!columns) {
      return null;
    }
    // console.log("state", this.state);

    return (
      <div className="board" id="boardId">
        <AddColumnForm
          onAdd={(colunmTitle, id) => this.addColumn(colunmTitle, id)}
        />
        <div className="columns">
          {columns.map(column => (
            <Column
              column={column}
              key={column.id}
              onDrag={this.onDrag}
              onDrop={this.onDrop}
              onDragOver={this.onDragOver}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onAddCard={this.addCard}
              onRemoveCard={this.removeCard}
              onRemoveColumn={this.removeColumn}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
