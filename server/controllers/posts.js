import Post from '../models/Post.js'
import User from '../models/User.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { title } from 'process'

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body
    const user = await User.findById(req.userId)

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name
      const __dirname = dirname(fileURLToPath(import.meta.url))
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      })

      await newPostWithImage.save()
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      })

      return res.json(newPostWithImage)
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: '',
      author: req.userId,
    })
    await newPostWithoutImage.save()
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    })

    return res.json(newPostWithoutImage)
  } catch (error) {
    res.json({ message: 'Something went wrong!' })
    console.log(error)
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt')
    const popularPosts = await Post.find().limit(6).sort('-views')

    if (!posts) {
      return res.json({ message: 'Not Posts' })
    }

    res.json({ posts, popularPosts })
  } catch (error) {
    res.json({ message: 'Something went wrong!' })
  }
}

export const getById = async (req, res) => {
  try {
   const post = await Post.findByIdAndUpdate(req.params.id, {
    $inc: { views: 1}
   })
      res.json(post)
  } catch (error) {
    res.json({ message: 'Something went wrong!' })
  }
}

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id)
      })
    )

    res.json(list)
  } catch (error) {
    res.json({ message: 'Something went wrong!' })
  }
}

export const removeMyPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if(!post) return res.json({message: 'The post doesn\'t exist'})

    await User.findByIdAndUpdate(req.userId, {
      $pull: {posts: req.params.id},
    })

    res.json({message: 'Post has been deleted'})
  } catch (error) {
    res.json({ message: 'Something went wrong!' })
  }
}

export const updatePost = async (req, res) => {
  try {
   const {title, text, id} = req.body
   const post = await Post.findById(id)

   if (req.files) {
    let fileName = Date.now().toString() + req.files.image.name
    const __dirname = dirname(fileURLToPath(import.meta.url))
    req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
    post.imgUrl = fileName || ''
   }

   post.title = title
   post.text = text

   await post.save()

    res.json(post)
  } catch (error) {
    res.json({ message: 'Something went wrong!' })
  }
}