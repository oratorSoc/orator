var json2xls = require("json2xls");
const fs = require("fs");

const mongoose = require("mongoose");
const env = require("dotenv");
env.config({ path: "./../conf/.env" });

const Email = require("./../model/email");

const User = require("./../model/user");

mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  const users = await User.find(
    {},
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
  );

  var data = JSON.stringify(users);
  var arr = JSON.parse(data);
  // var arr = [];
  // users.forEach((ele) => {
  //   var obj = {};
  //   obj.name = JSON.stringify(ele.name);

  //   obj.email = JSON.stringify(ele.email);
  //   obj.mobile = JSON.stringify(ele.mobile);

  //   obj.message = JSON.stringify(ele.message);
  //   arr.push(obj);
  // });

  const xls = json2xls(arr);

  fs.writeFileSync("users.xlsx", xls, "binary");
  process.exit();
})();
