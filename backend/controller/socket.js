export const handleSocketConnections = (io) => {
  io.on("connection", (socket) => {
    console.log("[*] Socket.io: User connected. ID: " + socket.id);

    socket.on("project:join", (projectID) => {
      socket.join(projectID);
      console.log("[*] Socket.io: User: " + socket.id + " joined project: " + projectID);
    });

    socket.on("project:update", (projectID) => {
      socket.to(projectID).emit("project:updated");
      console.log("[*] Socket.io: Project: " + projectID + " updated");
    });

    socket.on("disconnect", () => {
      console.log("[*] Socket.io: User disconnected. ID: " + socket.id);
    });
  });
}



