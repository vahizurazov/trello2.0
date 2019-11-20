const io = require("socket.io")();

const state = {
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
};

io.on("connection", socket => {
  io.emit("new state", state);
  socket.on("new state", state => {
    console.log("here is update");
    io.emit("new state", state);
  });
  socket.on("disconnect", () => {
    console.error("ERROR");
  });
});
const port = 8000;
io.listen(port);
console.log("listening on port ", port);
