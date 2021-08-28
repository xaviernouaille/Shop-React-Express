import { param, ValidationChain } from 'express-validator'

const create: ValidationChain[] = []

const getOne: ValidationChain[] = [
  param('_id')
    .notEmpty()
    .withMessage('Cannot be Empty')
    .isMongoId()
    .withMessage('Must to be a MongoId'),
]

export default { create, getOne }
