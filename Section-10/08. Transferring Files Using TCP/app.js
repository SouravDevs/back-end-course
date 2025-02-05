import { createReadStream, createWriteStream } from "node:fs";
import net from "node:net"

const server = net.createServer()

server.listen(4000, '0.0.0.0', () => {
  console.log('Server Started on Port: 4000');
})



server.on("connection", (socket) => {
  console.log('New Client is Connected');

  const writeStream = createWriteStream('Story.mp4')
  socket.pipe(writeStream)

  // Send a File to Client
process.stdin.on("data", (input) => {
  const inputStr = input.toString().trim()

  if(inputStr === 'send') {
    const readStream = createReadStream("C:\\Users\\1339m\\OneDrive\\Desktop\\numbers.txt")
    readStream.pipe(socket)

    // This will after File Transferred Successfully
    readStream.on("end", () => {
      console.log('File Transferred Successfully');
    })
  }
  else {
    socket.write(input)
  }
})

  socket.on("data", (chunk) => {
    process.stdout.write(chunk)
  })

  // This will run after File Received Successfully.
  writeStream.on("finish", () => {
    console.log("File Received Successfully");
  })



  socket.on('error', () => {
    console.log('Client is Disconnected');
  })
})

