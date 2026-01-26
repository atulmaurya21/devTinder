const express = require("express");
const app = express();
const {getAuth, userAuth} = require("./middleware/auth")


app.use("/admin", getAuth);

app.get("/admin/getAllUser", (req, res) => {
 res.send("All data send")
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Data sent by delete ");
});
// Basically we use userAuth middleware for a particular route

app.post("/User/login", (req, res) => {
  res.send("user login successfully ")
})
app.get("/User/getdata",userAuth, (req, res) => {
  res.send("Data sent by delete ");
});

app.listen(3000, () => {
  console.log("server is successfully  listening on port no 3000");
});
