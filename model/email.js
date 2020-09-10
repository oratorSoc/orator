const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        ,
        "Use a valid Email",
      ],
      trim: true,
      unique:true
    },
  },
  { timestamps: true }
);

const email = mongoose.model("email", emailSchema);

module.exports = email;
