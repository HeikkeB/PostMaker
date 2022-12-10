/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register user

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: `There is already a ${username} with the same name`,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: '30d',
    // });

    await newUser.save();

    res.json({
      newUser: username,
      // token,
      message: "Registration it's ok",
    });
  } catch (error) {
    res.json({ message: `Errors: ${error}` });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: `${username} not found`,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: 'Invalid password',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('jwt', token, { expires: new Date(Date.now() + 12 * 3600000), httpOnly: true, sameSite: true });

    res.json({
      token,
      user: username,
      message: 'You are logged in',
    });
  } catch (error) {
    res.json({ message: `Errors: ${error}` });
  }
};

// Get Me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "This user doesn't exist",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({ message: 'No access' });
  }
};
