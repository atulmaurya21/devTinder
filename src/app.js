const express = require("express");
const app = express();
const { getAuth, userAuth } = require("./middleware/auth");

//error handling
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
app.get("/getUserData", (req, res) => {
  //Logic for DB call and get user  data
  throw new Error("dfghjnkml");

  res.send("Data sent by delete ");
});

//for error handling

app.listen(3000, () => {
  console.log("server is successfully  listening on port no 3000");
});
