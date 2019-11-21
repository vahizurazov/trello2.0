import React from "react";
import io from "socket.io-client";

const addColumn = title => {
  this.setState(prevState => ({
    columns: prevState.columns.concat({
      title,
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
      cards: []
    })
  }));
};

export default { addColumn };
