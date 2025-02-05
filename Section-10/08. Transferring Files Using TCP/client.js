import { createReadStream, createWriteStream } from "node:fs"
import net from  "node:net"

const socket = net.createConnection({host: "192.168.0.102", port: 4000})

const word = 'send file'
const wordSplit = word.substring(5)
console.log(wordSplit);

// Send a File to Server using input FilePath
process.stdin.on("data", (input) => {
  const inputStr = input.toString().trim()
  const input1 = inputStr.substring(0,4)
  const input2 = inputStr.substring(5)

  if(input1 === 'send') {
    const readStream = createReadStream(`${input2}`)

    readStream.pipe(socket)

    // This will run after File Transferred Successfully.
    readStream.on("end", () => {
      console.log('File Transferred Successfuly');
    })
  }
  else {
    socket.write(input)
  }
})

// Send a File to Server
// process.stdin.on("data", (input) => {
//   const inputStr = input.toString().trim()

//   if(inputStr === 'send') {
//     const readStream = createReadStream("C:\\Users\\1339m\\OneDrive\\Desktop\\Story.mp4")

//     readStream.pipe(socket)

//     // This will run after File Transferred Successfully.
//     readStream.on("end", () => {
//       console.log('File Transferred Successfuly');
//     })
//   }
//   else {
//     socket.write(input)
//   }
// })

socket.on('connect', () => {
  console.log("Server is Connected");
})

const writeStream = createWriteStream('Text.txt')
socket.pipe(writeStream)

// This will run after File Received Successfully.
writeStream.on('finish', () => {
  console.log("File Received Successfully");
})

socket.on("error", () => {
  console.log("Server is Lost");
})