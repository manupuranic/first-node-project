const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>Node App</title></head>");
  if (req.url == "/home") {
    res.write("<body><h1>Welcome home</h1></body>");
  } else if (req.url === "/about") {
    res.write("<body><h1>Welcome to About Us page</h1></body>");
  } else if (req.url === "/node") {
    res.write("<body><h1>Welcome to my Node Js project</h1></body>");
  }
  res.write("</html>");
  res.end();
});

server.listen(4000);
