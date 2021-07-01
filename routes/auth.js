const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.Password, salt);
    const newUser = new User({
      Name: req.body.Name,
      Student_Id: req.body.Student_Id,
      Email: req.body.Email,
      Password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ Student_Id : req.body.Student_Id });
    !user && res.status(400).json("Wrong credentials!");

    //to confirm that password belong to a user
    const validated = await bcrypt.compare(req.body.Password, user.Password);
    !validated && res.status(400).json("Wrong credentials!");

    //hide password in database
    const { Password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;



