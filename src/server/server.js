const io = require("socket.io")();

const port = 8000;

let serverState = {
  revision: 1,
  columns: [
    {
      title: "Backlog",
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      cards: [
        {
          title: "First Backlog",
          description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          title: "Second Backlog",
          description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          title: "Third Backlog",
          description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
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
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          title: "2 in DEV",
          description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
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
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          title: "2 DONE",
          description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        },
        {
          title: "3 DONE",
          description: "asidfai asdf asdf sadf sadf asdf sad fpiasudhuh",
          id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
        }
      ]
    }
  ]
  // draggedCard: {}
};

io.on("connection", socket => {
  io.emit("trello.init", serverState);

  socket.on("trello.modify", state => {
    serverState = state;
    // console.log("here is update");
    io.emit("trello.change", serverState);
  });
  // socket.on("add title column", title => {
  //   console.log("title", title);
  //   console.log("state", {});

  //   io.emit("emit title", title);
  //   //console.log('io.emit("emit title", title )', io.emit("emit title", title));

  //   io.emit("emit title", title);
  // });
  socket.on("disconnect", () => {
    console.error("disconnect");
  });
});
io.listen(port);
console.log("listening on port ", port);
