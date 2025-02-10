import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

class UserController {
  createUser = async (req, res) => {
    const { first_name, last_name, email, password, password_confirmation } =
      req.body;

    if (password !== password_confirmation) {
      return res
        .status(400)
        .json({ message: "Password confirmation must match password." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered", user: newUser });
    } catch (err) {
      res.status(400).json({ message: "Error registering user", error: err });
    }
  };

  loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ message: "Logged in successfully", user, token });
  };

   getUserById = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}

export default new UserController();
