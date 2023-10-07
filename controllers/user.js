const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//register user
//@route POST api/register
const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      res.status(400).send("All fields are necessary");
      // throw new Error("All fields are necessary");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400).send("User already existed");
    }

    //creating Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    console.log(`User Created ${newUser}`);
    if (newUser) {
      res.status(201).json({ _id: newUser.id, email: newUser.email });
    } else {
      res.status(401).send("User not created");
    }
  } catch (error) {}
};

//login user
//@route POST /api/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("All fields are mandatory");
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("User not found");
    }

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        {
          user: {
            userName: user.userName,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401).send("Password doesn't match");
    }
  } catch (error) {}
};

//current user
//@route GET /api/current
const currentUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {}
};

module.exports = { registerUser, loginUser, currentUser };
