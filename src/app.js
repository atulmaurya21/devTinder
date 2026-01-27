const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added Successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong:");
  }
});

//Feed API- GET/ feed - get all the users from the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong:");
  }
});

app.delete("/user", async (req, res) => {
  const userID = req.body.userID;
  console.log(userID);

  try {
    //  const User = await User.findByIdAndUpdate({ _id: userID});
    const deletedUser = await User.findByIdAndDelete(userID);
    res.send("User deleted sucessfully");
  } catch (err) {
    res.status(400).send("Something went wrong:");
  }
});

// update the user

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators:true
    });
    console.log(updateUser);
    
    res.send("User updated sucessfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED" + err.message);
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
