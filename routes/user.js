const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

router.post("/signup", async (req, res) => {
  try {
    if (!req.body.email || !req.body.pass) {
      return res.status(400).send("Please enter your email and password");
    }
    const isRegistered = await User.findOne({ email: req.body.email });
    if (isRegistered) {
      return res.status(400).send("This user already exists!");
    } else {
      const { email, pass } = req.body;
      const user = new User({ email, pass });
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.pass, salt, async (err, hash) => {
          user.pass = hash;
          try {
            await user.save();
            return res.status(201).send("User registered successfuly!");
          } catch (error) {
            return res
              .status(500)
              .send("Uh oh, something is wrong, please try agains!");
          }
        });
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send("Uh oh, something is wrong, please try agains!");
  }
});

//Authenticate user
router.post("/signin", async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User isn't registered!");
    }
    bcrypt.compare(pass, user.pass, function(err, result) {
      if (!result) {
        return res.status(401).send("Password is incorrect!");
      }
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: "15m"
      });
      const { iat, exp } = jwt.decode(token);
      return res.status(200).send({ iat, exp, token });
    });
  } catch (err) {
    return res
      .status(500)
      .send("Uh oh, something is wrong, please try agains!");
  }
});
module.exports = router;
