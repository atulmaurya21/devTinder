const express = require("express");
console.log("Server start ");

const app = express();

// multiple route handler
app.use("/user", (req, res,next) => {
  
  // this callback function is called Route handler
  console.log("Route handler")
  next();
  res.send("First route handler");
}, (req, res) => {
  res.send("@nd route handler")
});


app.listen(3000, () => {
    console.log("server is successfully  listening on port no 3000");
    
});
