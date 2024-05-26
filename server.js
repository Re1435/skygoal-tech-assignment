const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(express.json())
const PORT = process.env.PORT || 3001

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is connected!'))
  .catch((err) => console.log(`There is an error while connecting DB ${err}`))

app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
