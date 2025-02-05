import http from "node:http";

const server = http.createServer((request, response) => {
  console.log("Got the request");
  request.on("data", (chunk) => {
    console.log(chunk.toString());
  });

  response.end("Hello from http server");
});

server.listen(80, () => {
  console.log("Server started");
});
