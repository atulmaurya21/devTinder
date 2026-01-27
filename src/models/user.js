const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      //how to check the custom validation
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },

    //default value
    photoUrl: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    about: {
      type: String,
      default: "This is default about of the user ",
    },

    skills: {
      type: [String],
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
//1. way
// const User = mongoose.model("User", userSchema);
// module.exports = {
//     User
// }

//2.way

module.exports = mongoose.model("User", userSchema);
