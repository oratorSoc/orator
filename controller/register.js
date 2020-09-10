const User = require("./../model/user");
const Email = require("./../model/email");
var json2xls = require("json2xls");
const fs = require("fs");
const { start } = require("repl");
exports.registerUser = async (req, res, next) => {
  try {
    const userFind = await User.findOne({ email: req.body.email });
    if (userFind) {
      return res.render("error");
    }

    const user = await User.create(req.body);

    res.render("success");
  } catch (e) {
    return res.render("error");
  }
};

exports.registerEmail = async (req, res, next) => {
  const mail = await Email.findOne({ email: req.body.email });
  if (mail) {
    return res.render("error");
  }
  try {
    const email = await Email.create(req.body);
    res.render("success");
  } catch (e) {
    return res.render("error");
  }
};

exports.removeEmail = async (req, res, next) => {
  const mail = await Email.findOne({ email: req.body.email });
  if (!mail) {
    return res.render("error");
  }

  try {
    mail.remove();

    res.render("success");
  } catch (e) {
    return res.render("error");
  }
};

exports.getData = async (req, res, next) => {
  res.render("data.ejs");
};

exports.sendData = async (req, res, next) => {
  const { start, end } = req.body;
  const users = await User.find(
    { createdAt: { $gte: start, $lte: end } },
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
  ).sort({ createdAt: -1 });

  console.log(users);
  var data = JSON.stringify(users);
  var arr = JSON.parse(data);

  const xls = json2xls(arr);

  fs.writeFileSync("users.xlsx", xls, "binary");
  res.download("users.xlsx", "data.xlsx");
  
};
