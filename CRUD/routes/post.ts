import express from 'express'
import PostModel from '../model/Post'
import postValidator from '../validator/postValidator'

const PostRouter = express.Router()

PostRouter.use('/', require('../crud/crud')(PostModel, postValidator))

export default PostRouter
