const jwt = require('jsonwebtoken')

const userMiddleware = (req, res, next) => {
  try {
    let token = req.headers.token

    if (!token) {
      return res.status(401).json({ message: 'Token not found' })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decodedToken
    next()
  } catch (error) {
    console.log('Error authenticating user ', error)
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = { userMiddleware }
