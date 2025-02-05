import net from "node:net";

// Create a server
const server = net.createServer();

// Start a server
server.listen(4000, "0.0.0.0", () => {
  // '0.0.0.0 means IPv4
  console.log("Server started on port : 4000");
});

// Define new device is connected
// Receive data or message from Client using socket
server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString());

    // Sent data or message to a client
    socket.write("HTTP\n\nGot your message");
    socket.end();
  });
  // Get IP Address of server's device
  console.log(socket.address());

  // Get IP Address & port & remoteFamily of client's device or mobile
  console.log(socket.remoteAddress);
  console.log(socket.remotePort);
  console.log(socket.remoteFamily);

  console.log("New Device Connected");

  // Define a client is disconnected
  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client is disconnected");
  });
});
