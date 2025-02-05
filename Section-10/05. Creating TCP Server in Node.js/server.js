import net from 'node:net'

// Create a server
const server = net.createServer()

// Start a server
server.listen(4000, '0.0.0.0', () => {
    console.log("Server started on port : 4000");
})

server.on("connection", (socket) => {
    socket.on("data", (chunk) => {
        console.log(chunk.toString());
    })
    console.log('New client is connected');
})