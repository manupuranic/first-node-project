const http = require("http");
const fs = require("fs");

// const server = http.createServer((req, res) => {
//   res.setHeader("content-type", "text/html");
//   res.write("<html>");
//   res.write("<head><title>Node App</title></head>");
//   if (req.url == "/home") {
//     res.write("<body><h1>Welcome home</h1></body>");
//   } else if (req.url === "/about") {
//     res.write("<body><h1>Welcome to About Us page</h1></body>");
//   } else if (req.url === "/node") {
//     res.write("<body><h1>Welcome to my Node Js project</h1></body>");
//   }
//   res.write("</html>");
//   res.end();
// });

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Node App</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("location", "/");
        return res.end();
      });
    });
  }
  res.write("<html>");
  res.write("<head><title>Node App</title></head>");
  res.write("<body><h1>Welcome to my Node Js project</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(4000, () => {
  console.log("Server is Running at port: 4000");
});
