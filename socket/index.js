const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      const newUser = { userId: newUserId, socketId: socket.id };
      activeUsers.push(newUser);
      console.log("New User Connected", newUser);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  // remove user when disconnected
  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", socket.id);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    console.log("Sending message", data);
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to:", receiverId);
    console.log("Data:", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
      console.log("Message emitted");
    } else {
      console.log("Receiver user not found");
    }
  });
});
