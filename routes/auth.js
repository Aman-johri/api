const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');
const { route } = require("./Posts");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// router.get("/register", (req, res) => {
//   res.send(200).json("login");
// });


//REGISTER
router.post("/register", [
  body("username", "Username is required").not().isEmpty(),
  body("email", "Email is in not correct formmat").isEmail().normalizeEmail(),
  body("password", "Password must be in 5 character").isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });
  const user = await newUser.save();
  res.status(200).json({user: user._id});
});

const maxAge = 3 * 24 * 60 * 60;

// const createToken = (id) => {
//    return jwt.sign({id}, "aman johri secret", {
//      expiresIn: maxAge
//    });
// }
// router.get("/login", (req, res) => {
//   res.send(200).json("login");
// });

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try{
    const user = await User.findOne({ email });
    console.log("userdetails",user);
    if (user){
      const password = bcrypt.compare(req.body.password, user.password);
      console.log("password",password);
      if (password){
        const data = {username:user.username , id:user._id}
        const token = jwt.sign(data, "JWT_SECRET");
        console.log("token",token);
        res.status(200).json({user: user , token});
    }
  }
  else{
    res.status(401).json("Invalid email or password");
  }
}
catch(err){
  res.status(500).json(err);
}
});
  
module.exports = router;


