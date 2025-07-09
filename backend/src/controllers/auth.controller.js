import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { full_name, email, password } = req.body;
  try {
    if (!full_name || !email || !password) return res.status(400).json({ message: 'All fields are required' });
    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be al least 6 characters' });

    const user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: 'Email already Exist' });

    const salt = await bcrypt.genSalt(10);
    const hashed_passw = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      full_name: full_name,
      email: email,
      password: hashed_passw,
    });

    if (newUser) {
      generateToken(newUser.id, res);

      res.status(201).json({ id: newUser.id, email: newUser.email, full_name: newUser.full_name });
    }
    else {
      return res.status(400).json({ message: 'Invaild user data' });
    }

  } catch (e) {
    console.log('Error in singup controller', e.message);
    res.status(500).json({ message: 'internal Server Error', error: e.message });
  }
}

export const login = (req, res) => {
  res.send('login route');
}

export const logout = (req, res) => {
  res.send('logout route');
}
