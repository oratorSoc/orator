const express = require("express");
const app = express();
const connection = require("./conf/db");
const cors = require("cors");
const env = require("dotenv");
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

const morgan = require("morgan");

const colors = require("colors");
const port = process.env.PORT || 8080;
env.config({ path: "./conf/.env" });

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static('public'))
connection();

const registerRoute = require("./routes/register.js");

app.use("/api/register", registerRoute);



const server=app.listen(port, () => console.log("App is listen on Port ", port));




app.get('/',async (req,res)=>{
  res.send('index.html')
})

// app.get('/register',async (req,res)=>{
//   res.render('form.ejs')
// })

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error :${err.message}`.red.bold);
  //Close Server
  server.close(() => process.exit(1));
});
