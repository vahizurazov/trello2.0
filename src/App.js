import React, { Component } from "react";
import "./style/Board.css";
import AddColumnForm from "./components/AddColumnForm";
import Column from "./components/Column";

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
    console.log(title, description, id);
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
    const { columns } = this.state;
    const columnIndex = columns.findIndex(el => el.id === columnId);
    const filteredCards = columns[columnIndex].cards.filter(
      el => el.id !== card.id
    );
    const updatedColumn = { ...columns[columnIndex], cards: filteredCards };
    const filteredcolumns = columns.filter(el => el.id !== columnId);
    filteredcolumns.splice(columnIndex, 0, updatedColumn);
    this.setState({ columns: filteredcolumns, draggedCard: card });
  };

  onDrop = (event, columnId) => {
    console.log("event", event);
    console.log("target", event.target.className);
    console.log("currentTarget", event.currentTarget);

    const { draggedCard, columns } = this.state;
    const columnIndex = columns.findIndex(col => col.id === columnId);
    const copyColumns = columns.slice();
    copyColumns[columnIndex].cards.push(draggedCard);

    this.setState({
      columns: copyColumns,
      draggedCard: {}
    });
  };
  onDragOver = event => {
    event.preventDefault();
  };
  onDragEnter = event => {
    console.log("event.targe ONDRAGENTER", event.target);
  };

  render() {
    const { columns } = this.state;
    console.log("THIS>STATE", this.state);
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
