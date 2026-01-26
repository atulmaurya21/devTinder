const express = require("express");
console.log("Server start ");

const app = express();

app.use("/test",(req, res) => {
    res.send("Hello from the server" )
})

app.use("/hello", (req, res) => {
  res.send("Hello World");
});

app.use("/", (req, res) => {
  res.send("All wildcard route");
});

app.listen(3000, () => {
    console.log("server is successfully  listening on port no 3000");
    
});
