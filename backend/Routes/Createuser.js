const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "mynameiskhan";

router.post(
  "/createuser",
  body("email", "Invalid Email").isEmail(),
  body("password", "Invalid Password").isLength({ min: 6 }),
  body("name", "Invalid Name Format").isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    // building API here
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location
      });
      res.json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.post("/loginuser", body("email").isEmail(), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let email = req.body.email;
  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "email incorrect" });
    }
    console.log(req.body.password);
    console.log(userData.password);
    const pwdCompare = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!pwdCompare) {
      res.status(400).json({ errors: "password incorrect" });
    }
    const data = {
      user: {
        id: userData.id,
      },
    };
    const authToken = jwt.sign(data, jwtsecret, { expiresIn: 24 * 60 * 60 });
    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});
module.exports = router;
