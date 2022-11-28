import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express()
dotenv.config()

//Constants
const PORT = process.env.PORT || 5001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

//Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//Routes
app.use('/auth', authRoute)
app.use('/posts', postRoute)
app.use('/comments', commentRoute)
app.use('/', ((req, res) => {
  res.redirect( '/auth/me')
}))


async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.p8tssia.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    )

    app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

start()
