const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Sachin",
    lastName: "Tendulkar ",
    emailId: "sachin210903@gamil.com",
    password: "atul@123",
  };
  // create a new instance of User model
  //dummy  hardcoded to data
  const user = new User(userObj);
  try {
    await user.save();
    res.send("User added Successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user"+ err.message)
  }
});

connectDB()
  .then(() => {
    console.log("Database connected established..");
    app.listen(3000, () => {
      console.log("server is successfully  listening on port no 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
