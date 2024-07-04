import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });

    const { password: _, ...data } = user._doc;

    res.status(201).json({ message: "User created successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
