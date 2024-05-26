const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { registerUser, loginUser } = require('../controllers/userController')
const { userMiddleware } = require('../middlewares/middleware')

router.post('/signup', registerUser)

router.post('/login', loginUser)

router.get('/userDetails', userMiddleware, async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.userId)
    res.status(201).json({ userDetails })
  } catch (error) {
    console.log('Error while getting user details ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
