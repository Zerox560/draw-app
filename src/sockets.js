function listen(io) {
  const line_history = [];

  io.on("connection", (socket) => {
    line_history.forEach((data) => {
      io.emit("drawLine", { line: data });
    });

    socket.on("drawLine", (data) => {
      line_history.push(data.line);

      io.emit("drawLine", data);
    });
  });
}

module.exports = { listen };
