import { createReadStream } from "fs";
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const readStream = createReadStream("./public/index.html");
    readStream.pipe(res);
  } else {
    const readStream = createReadStream(`./public${req.url}`);
    readStream.pipe(res);

    readStream.on("error", (err) => {
      console.log(err.message);
      const readStream = createReadStream("./public/error.html");
      readStream.pipe(res);
    });
  }
});

server.listen(4000, "192.168.0.102", () => {
  console.log("Server started");
});
