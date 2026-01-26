const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://atul210903_db_user:dvPLTR3qFbQXXse0@namaste-node.lv79jtl.mongodb.net/devTinder",
  );
};

connectDB()
  .then(() => {
    console.log("Database connected established..");
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
