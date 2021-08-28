import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { versionKey: false }
)

const Post = mongoose.model('Post', PostSchema)

export default Post
