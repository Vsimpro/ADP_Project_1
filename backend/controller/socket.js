export const handleSocketConnections = (io) => {
  io.on("connection", (socket) => {
    console.log("[*] Socket.io: User connected. ID: " + socket.id);

    socket.on('join', (projectId) => {
      socket.join(projectId);
      console.log(socket.id + " joined " + projectId)
    });

    socket.on("project:update", (projectID) => {
      //socket.broadcast.emit("project:updated");
      //TODO: tällähetkellä lähettää kaikille clienteille viestin
      // muokkaa tämä käyttämään projectID:n mukaisia roomeja kun projektisivu on valmis
      socket.in(projectID).emit("project:updated");
      console.log("[*] Socket.io: Project: " + projectID + " updated");
    });

    socket.on("disconnect", () => {
      console.log("[*] Socket.io: User disconnected. ID: " + socket.id);
    });
  });
}



