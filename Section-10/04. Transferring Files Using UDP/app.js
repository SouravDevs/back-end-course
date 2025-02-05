import dgram from "node:dgram";
import { createWriteStream } from "node:fs";
import { writeFile } from "node:fs/promises";

const socket = dgram.createSocket("udp4");
// console.log(socket);
const writeStream = createWriteStream('numbers.txt')
socket.on("message", async(message, remoteAddress) => {
    
    if(message.toString() === "EOF") {
        socket.send('File Uploaded Successfully on the server', remoteAddress.port, remoteAddress.address)
    }
    else {
      writeStream.write(message)

  }
});

// 192.168.0.100
// socket.send('Hii from Node.js', 3000, "192.168.0.100")

socket.bind({ port: 4000 }, () => {
  const address = socket.address();
  console.log("Listening");
  console.log(socket.address());
  console.log("Listening on PORT : ", address.port);
});                                                                    
// socket.bind({port: 3000})


