const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User Already Exist' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    })

    await newUser.save()
    res.status(201).json({ message: 'User Registered Successfully' })
  } catch (error) {
    console.log(`Error while signup user ${error}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
      return res.status(400).json({ message: 'User not found' })
    }
    const passwordMatched = await bcrypt.compare(password, isUserExist.password)

    if (!passwordMatched) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    const secretKey = process.env.JWT_SECRET_KEY

    jwt.sign(
      { email: isUserExist.email, userId: isUserExist._id },
      secretKey,
      { expiresIn: 3600 * 24 },
      (err, token) => {
        if (err) throw err
        return res.status(200).json({ token })
      }
    )
  } catch (error) {
    console.log('Error logging in user', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = { registerUser, loginUser }
