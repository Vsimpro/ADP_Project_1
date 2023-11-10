export const handleSocketConnections = (io) => {
	io.on("connection", (socket) => {
		console.log("[*] Socket.io: User connected. ID: " + socket.id);

		socket.on("project:join", (projectID) => {
			console.log("[*] Socket.io: User: " + socket.id + " joined project: " + projectID);
			socket.join(projectID);
		});

		socket.on("disconnect", () => {
			console.log("[*] Socket.io: User disconnected. ID: " + socket.id);
		});
	});

	const emitProjectUpdate = (projectID) => {
		io.to(projectID).emit("project:update", projectID);
	};

};


