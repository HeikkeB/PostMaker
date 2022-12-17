/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import BadRequest from '../errors/BadRequest.js';
import Conflict from '../errors/Conflict.js';
import User from '../models/User.js';

// Register user
export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    await newUser.save();

    res.json({
      user: username,
      message: "Registration it's ok",
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequest('Incorrect data entered'));
    } else if (error.code === 11000) {
      next(new Conflict(`"${req.body.username}" is already taken, please select another username`));
    } else {
      next(error);
    }
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: 'Invalid username or password',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({
        message: 'Invalid username or password',
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
    if (error.name === 'ValidationError') {
      next(new BadRequest('Incorrect data entered'));
    } else {
      next(error);
    }
  }
};

// Get Me
export const getMe = async (req, res, next) => {
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
    next(error);
  }
};
