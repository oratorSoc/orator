const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name cannot be greate than 50 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        ,
        "Use a valid Email",
      ],
    },
    mobile: {
      type: String,
    },

    subject: {
      type: String,
    },

    message: {
      type: String,
      maxlength: [500, "Desc  cannot be more than 50 words"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
