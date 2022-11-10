import User from '../models/User.js'
import bcrypt from 'bcryptjs'
//Register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body
    const isUsed = await User.findOne({ username })

    if (isUsed) {
      return res.json({
        message: 'This username is taken',
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username,
      password: hash,
    })

    await newUser.save()

    res.json({
      newUser,
      message: "Registration it's ok",
    })
  } catch (error) {
    res.json({ message: `Errors: ${error}` })
  }
}

//Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.json({
        message: "This user doesn't exist",
      })
    }
  } catch (error) {
    res.json({ message: `Errors: ${error}` })
  }
}

//Get Me
export const getMe = async (req, res) => {
  try {
  } catch (error) {}
}
