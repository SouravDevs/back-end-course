import dgram from "node:dgram";

const socket = dgram.createSocket("udp4");
// console.log(socket);

socket.on("message", (message, remoteAddress) => {
  console.log(message.toString());
  console.log(remoteAddress);

  socket.send(
    "Message Received Successfully on Server",
    remoteAddress.port,
    remoteAddress.address
  );
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
