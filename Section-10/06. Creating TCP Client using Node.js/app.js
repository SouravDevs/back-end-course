import net from "node:net";

// Create a server
// Define new device is connected
// Receive data or message from Client using socket
const server = net.createServer((socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString());

    // Sent data or message to a client
    socket.write("HTTP\n\nGot your message");
    // socket.end();
  });
  // Get IP Address of server's device
  console.log(socket.address());

  // Get IP Address & port & remoteFamily of client's device or mobile
  console.log(socket.remoteAddress);
  console.log(socket.remotePort);
  console.log(socket.remoteFamily);

  console.log("New Device is Connected");

  // Define a client is disconnected
  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client is disconnected");
  });

  // Error handling
  socket.on('error', () => {
    console.log("Client is Lost");
  })
});

// Start a server
server.listen(4000, "0.0.0.0", () => {
  // '0.0.0.0 means IPv4
  console.log("Server started on port : 4000");
});
