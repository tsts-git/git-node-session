const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {

  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ userName }).lean();

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userInfo = {
    _id: foundUser._id,
    name: foundUser.name,
    userName: foundUser.userName,
    roles: foundUser.roles,
    email: foundUser.email,
  };

  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.json({ "token":accessToken });
};

const register = async (req, res) => {
  const { userName, password, name, email, phone, roles } = req.body;

  if (!userName || !password || !name || !email || !phone  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if(roles)
    if (roles !== "Admin" &&  roles !== "User")
      return res.status(400).json({ message: "error role" });


  const existingUser = await User.findOne({ userName }).lean();
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    userName,
    password: hashPassword,
    name,
    email,
    phone,
    roles
  });

  if (!newUser) {
    return res.status(400).json({ message: "Bad request" });
  }

  res.json({ message: `User ${newUser.name} created` });
};

module.exports = { login, register };
