import http from "http";

const clientRequest = http.request({ method: "POST", host: "192.168.0.102" });

// Receive message or data from server
clientRequest.on("response", (response) => {
  response.on("data", (chunk) => {
    console.log(chunk.toString());
  });
});

// Error handling
clientRequest.on("error", (err) => {
  console.log(err.message);
});

// Send data or message from client
clientRequest.write("Hii I am Client");

// Disconnect from client
clientRequest.end("Disconnected from Client");
