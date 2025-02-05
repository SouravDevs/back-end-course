import { createReadStream} from "node:fs";
import net from "node:net";



const clientsList = [];

const server = net.createServer((socket) => {
  // socket.end("HTTP/1.1\n\nhii")
  socket.write("HTTP/1.1\n\n")

  // const readStream = createReadStream("Story.mp4", {highWaterMark: 1 * 1024});
  // const readStream = createReadStream("River.jpeg", {highWaterMark: 10});
  // const readStream = createReadStream("numbers.txt", {highWaterMark: 1});
  readStream.pipe(socket);
  readStream.on("end", () => {
    console.log("File ended");
  });

  socket.on("data", (chunk) => {
    console.log(chunk.toString());
  })

  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client disconnected");
  });

  socket.on("error", () => {
    console.log("Client Lost");
  });
  console.log("Client Connected", socket.remoteAddress);
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Server started on port 4000");
});
