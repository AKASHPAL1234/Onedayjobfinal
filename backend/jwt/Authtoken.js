
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";




const createTokenAndSavekey = async (userId, res) => {
  console.log(userId,res);
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: false,
    secure: true,               
    sameSite: "none",             
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSavekey;
