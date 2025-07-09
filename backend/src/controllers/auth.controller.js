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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Invalid Credential' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(404).json({ message: 'Invalid Credential' });

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
    });
  } catch (e) {
    console.log('Error in login controller', e.message);
    res.status(500).json({ message: 'internal Server Error', error: e.message });
  }
}

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'logged out successfully' });
  } catch (e) {
    console.log('Error in logout controller', e.message);
    res.status(500).json({ message: 'internal Server Error', error: e.message });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { full_name, email } = req.body;
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ['password'],
      }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!full_name && !email) return res.status(400).json({ message: 'You must change at least one filed' });

    if (full_name) {
      user.full_name = full_name;
    }
    if (email) {
      user.email = email;
    }

    await user.save();

    res.status(200).json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
    });
  } catch (e) {
    console.log('Error in update Profile', e.message);
    res.status(500).json({ message: 'Internal Server Error', error: e.message });
  }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    console.log('Error in check Auth', e.message);
    res.status(500).json({ message: 'Internal Server Error', error: e.message });
  }
} 
