import dgram from "node:dgram";

const socket = dgram.createSocket("udp4");
// console.log(socket);

socket.on("message", (message, remoteAddress) => {
  console.log(message.toString());
  console.log(remoteAddress);
});

socket.send("Hii from Client.js", 4000, "192.168.0.102", () => {
    console.log('Message sent');
});
