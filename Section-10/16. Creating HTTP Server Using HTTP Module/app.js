import http from "node:http";

const server = http.createServer((request, response) => {
  console.log("Got the request");

  response.setHeader("Content-Length", "20");
  response.write("Hii from http server");
  // response.end()
});

// server.on("connection", (socket) => {
//   socket.end("Hi from http server");
// });

server.listen(4000, "0.0.0.0", () => {
  console.log("Server is started");
});
