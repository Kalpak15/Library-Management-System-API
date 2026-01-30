const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    console.log("correct")
    
    // Find the user in DB
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
    }
    
    console.log("correct2")
    // Compare plain text passwords
    if (user.password !== password) {
        return res.status(400).json({ message: "Invalid email or password." });
    }
    
    console.log("correct3")
    // Generate JWT token
    const accessToken = jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2h" }
    );
    
    console.log("correct4")
    res.status(200).json({
      message: "Login successful.",
      userId: user._id,
      token: accessToken
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { login };