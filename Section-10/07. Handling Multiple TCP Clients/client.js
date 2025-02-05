import net from "node:net";

const socket = net.createConnection({ host: "192.168.0.102", port: 4000 });

process.stdin.on('data', (input) => {
 socket.write(input)
})

// Define server is connected
socket.on("connect", () => {
  console.log("Server is Connected");
});

// Received data from server
socket.on("data", (chunk) => {
  console.log(chunk.toString());
});

// Error handling
socket.on("error", () => {
  console.log("Server is Lost");
});

// Send data or message to server from client
setTimeout(() => {
  socket.write("Hii");
}, 2000);

