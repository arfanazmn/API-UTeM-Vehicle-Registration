const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.databaseId === req.params.id) {
      if (req.body.Password) {
        const salt = await bcrypt.genSalt(10);
        req.body.Password = await bcrypt.hash(req.body.Password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your account!");
    }
  });

//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.databaseId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        try {
          await Post.deleteMany({ Name: user.Name });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  });

//GET A USER
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL USERS
router.get('/', async (req, res) => {
  try {
      const users = await User.find();
      if(!users) throw Error('No Items');
      res.status(200).json(users);
  }catch(err) {
      res.status(400).json({msg:err})
  }
});


module.exports = router;