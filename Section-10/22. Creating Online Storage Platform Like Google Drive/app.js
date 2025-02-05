import { open, readdir } from "fs/promises";
import http from "http";

const server = http.createServer(async (req, res) => {
  if(req.url === '/') {
    const itemsList = await readdir("./storage");
  console.log(itemsList);
  let dynamicHTML = "";
  itemsList.forEach((item) => {
    dynamicHTML += `<a href= '${item}'> ${item} </a><br>`;
  });

  res.end(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>My Files</h1>
    <ul>
    ${dynamicHTML} 
     </ul>
</body>
</html>
        `);
  }
  else {
    const fileHandle = open()
  }
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Sevrver started on PORT: 4000");
});
