import user from "../models/userModel.js";

// login
export const loginUser = async (req, res) => {
  res.json({ msg: "Login user" });
};

// signup user
export const signupUser = async (req, res) => {
  res.json({ msg: "Signup user" });
};
