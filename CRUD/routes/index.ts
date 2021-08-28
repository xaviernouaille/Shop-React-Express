import express, { Request, Response } from 'express'
import postRouter from './post'
import productRouter from './product'

const Router = express.Router()

Router.use('/post', postRouter)

Router.use('/product', productRouter)

export default Router
