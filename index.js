const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRoute = require("./routes/Posts");
const categoryRoute = require("./routes/Categories");
var bodyParser = require('body-parser')
var cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
const cookieParser = require('cookie-parser');

//express-validator
const {check, validationResult} = require('express-validator/check');
app.use(cors())
const authRoute = require("./routes/auth");
const UserRoute = require("./routes/user");
app.use(express.json());
app.use(cookieParser());


mongoose.connect("mongodb+srv://AmanJohri:JohriAman@cluster0.euioa.mongodb.net/blog?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB"))
  .catch(err => console.log(err));


  app.use("/posts",postRoute);
  app.use("/category",categoryRoute);
  app.use("/auth",authRoute);
  app.use("/user",UserRoute);

app.listen(5000, () => {
    console.log("Backened is running");
});


//cookies
app.get("/cookies", (req, res) => {
  
  res.cookie('newUser',false);
  res.send("cookies");
});


