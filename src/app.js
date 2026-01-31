const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utils/validation");

app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //validate the email first skip right now but build it when u have time

    const uservalid = await User.findOne({ emailId: emailId });
    if (!uservalid) {
      throw new Error("Invalid credential !!!");
    }

    const isPasswordValid = await bcrypt.compare(password, uservalid.password);

    if (isPasswordValid) {
      res.send("Login Successfull!!");
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    // validation of data

    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password - use bcrypt the password

    const passwordHashed = await bcrypt.hash(password, 10);

    console.log(passwordHashed);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHashed,
    });

    await user.save();
    res.send("User added Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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

app.patch("/user/:userId", async (req, res) => {
  // const userId = req.body.userId;
  //dynamic the userid by for update the user id
  const userId = req.params?.userId;

  const data = req.body;
  try {
    const ALLOWED_UPDATE = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("update is not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const updateUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(updateUser);

    res.send("User updated sucessfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED: " + err.message);
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
