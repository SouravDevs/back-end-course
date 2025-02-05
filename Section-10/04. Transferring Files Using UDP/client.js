import dgram from "node:dgram";
import { createReadStream } from "node:fs";

const socket = dgram.createSocket("udp4");
// console.log(socket);

socket.on("message", (message, remoteAddress) => {
  console.log(message.toString());
  console.log(remoteAddress);
});

const readStream = createReadStream(
  "C:\\Users\\1339m\\OneDrive\\Desktop\\numbers.txt",
  { highWaterMark: 1000 }
);

readStream.on("data", (chunk) => {
  socket.send(chunk, 4000, "192.168.0.102", () => {
  });
});

readStream.on('end', () => {
  socket.send('EOF', 4000, "192.168.0.102", () => {
    console.log("Message sent");
  });
})
