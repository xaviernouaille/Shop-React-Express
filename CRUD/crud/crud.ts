import express, { Request, Response } from 'express'
import { Collection, Model } from 'mongoose'
import { ValidationChain, validationResult } from 'express-validator'

interface IValidator {
  create: ValidationChain
  getOne: ValidationChain
}

module.exports = (Collection: Model<Collection>, Validator: IValidator) => {
  // Create
  const create = (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const body = req.body
    Collection.create(body, (err: any, body: any) => {
      err ? res.send('err') : res.send(body)
    })
  }
  // getOne
  const getOne = (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { _id } = req.params
    Collection.findById(_id, (err: any, body: any) => {
      err ? res.send('err') : res.send(body)
    })
  }
  // getMany
  const getMany = (req: Request, res: Response) => {
    Collection.find({ ...req.query }, (err: any, body: any) => {
      err ? res.send('err') : res.send(body)
    })
  }
  // update
  const update = (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { _id } = req.params
    const body = req.body

    Collection.findByIdAndUpdate(
      _id,
      body,
      { new: true },
      (err: any, body: any) => {
        err ? res.send('err') : res.send(body)
      }
    )
  }
  // remove
  const remove = (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { _id } = req.params

    Collection.deleteOne({ _id: _id }, err => {
      err ? res.send(err) : res.send('Doc successfully deleted')
    })
  }

  const router = express.Router()
  router.post('/', Validator.create, create)
  router.get('/:_id', Validator.getOne, getOne)
  router.get('/', getMany)
  router.put('/:_id', update)
  router.delete('/:_id', remove)

  return router
}
