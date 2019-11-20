import React, { Component } from "react";
import AddColumnForm from "./components/AddColumnForm";
import Column from "./components/Column";

// import io from "socket.io-client";

import "./style/Board.css";

let oldColunmId = [];
let indexCard = [];
class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      columns: [
        {
          title: "Backlog",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
          cards: [
            {
              title: "First Backlog",
              description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            },
            {
              title: "Second Backlog",
              description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            },
            {
              title: "Third Backlog",
              description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
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
              title: "1 in DEV",
              description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            },
            {
              title: "2 in DEV",
              description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
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
              title: "1 DONE",
              description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            },
            {
              title: "2 DONE",
              description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            },
            {
              title: "3 DONE",
              description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
              id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
                36
              )
            }
          ]
        }
      ],
      draggedCard: {}
    };
  }

  // componentDidMount() {
  //   this.socket = io("http://localhost:8000");
  //   this.socket.on("new state", state => {
  //     console.log("state", state);
  //     if (JSON.stringify(state) !== JSON.stringify(this.state)) {
  //       this.setState({ ...state });
  //     }
  //   });
  // }

  // componentDidUpdate() {
  //   if (this.state.columns) {
  //     this.socket.emit("new state", this.state);
  //   }
  // }

  addColumn = title => {
    this.setState(prevState => ({
      columns: prevState.columns.concat({
        title,
        id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
        cards: []
      })
    }));
  };
  removeColumn = id => {
    this.setState(prevState => ({
      columns: prevState.columns.filter(item => item.id !== id)
    }));
  };

  addCard = (title, description, id) => {
    const cardId = {
      title,
      description,
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
    };
    this.state.columns.map((item, index) => {
      if (item.id === id) {
        this.setState(prevState => prevState.columns[index].cards.push(cardId));
      }
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
    this.setState({ columns: filteredcolumns });
  };

  onDrag = (event, card, columnId) => {
    event.preventDefault();
    oldColunmId = columnId;
    this.setState({ draggedCard: card });
  };

  onDrop = (event, columnId) => {
    const { draggedCard, columns } = this.state;
    const colIndex = columns.findIndex(col => col.id === columnId);
    const newCardIndex = columns[colIndex].cards.findIndex(
      card => card.id === indexCard
    );
    if (
      event.target.className === "card" ||
      event.target.className === "columns-wrapper"
    ) {
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
        columns: filteredcolumns,
        draggedCard: {}
      });
    }
  };

  onDragOver = event => {
    event.preventDefault();
  };
  onDragEnter = event => {
    console.log("ENTER", event.target);
    if (event.target.className === "card") {
      console.log("asddddddddddddddddddddddddddd", event.target);

      indexCard = event.target.getAttribute("id");
      event.target.style.background = "#2398ef";
    }
  };
  onDragLeave = event => {
    if (event.target.className === "card") {
      event.target.style.background = "";
    }
  };

  render() {
    const { columns } = this.state;
    // if (!columns) {
    //   return null;
    // }
    // console.log("THIS>STATE", this.state);
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
              drag={this.onDrag}
              drop={this.onDrop}
              dragOver={this.onDragOver}
              dragEnter={this.onDragEnter}
              dragLeave={this.onDragLeave}
              addCard={this.addCard}
              removeCard={this.removeCard}
              removeColumn={this.removeColumn}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
