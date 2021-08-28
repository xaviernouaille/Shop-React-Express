import express, { Request, Response } from 'express'
import Product from '../model/Product'

const ProductRouter = express.Router()

ProductRouter.get('/', (req: Request, res: Response) => {
  //     Product.insertMany([{
  //         title: faker.commerce.productName(),
  //         prix: faker.commerce.price(),
  //         categorie: faker.commerce.department().toLowerCase(),
  //         img: faker.random.image()
  //     },
  //     {
  //         title: faker.commerce.productName(),
  //         prix: faker.commerce.price(),
  //         categorie: faker.commerce.department().toLowerCase(),
  //         img: faker.random.image()
  //     },
  //     {
  //         title: faker.commerce.productName(),
  //         prix: faker.commerce.price(),
  //         categorie: faker.commerce.department().toLowerCase(),
  //         img: faker.random.image()
  //     },
  //     {
  //         title: faker.commerce.productName(),
  //         prix: faker.commerce.price(),
  //         categorie: faker.commerce.department().toLowerCase(),
  //         img: faker.random.image()
  //     },
  // ])

  let query = req.query
  query = { ...query, title: query.recherche }
  const clone = (({ recherche, ...o }) => o)(query)

  const titleR = new RegExp('^' + req.query.recherche, 'i')

  let limitDoc = 10

  let dbQuery = Product.find()
  if (clone.title) dbQuery = dbQuery.where({ title: titleR })
  if (clone.prixMin && Number(clone.prixMin) !== 0)
    dbQuery = dbQuery.where('prix').gte(clone.prixMin)
  if (clone.prixMax && Number(clone.prixMax) !== 0)
    dbQuery = dbQuery.where('prix').lte(clone.prixMax)
  if (clone.categorie)
    dbQuery = dbQuery.where('categorie').equals(clone.categorie)
  // if(clone.page)
  // dbQuery = dbQuery.limit(limitDoc).skip(limitDoc * Number(clone.page))
  // else
  // dbQuery.limit(limitDoc)

  Product.countDocuments(dbQuery).exec((count_error: any, count: any) => {
    if (count_error) res.send(count_error)
    else {
      if (clone.page) {
        dbQuery = dbQuery.limit(limitDoc).skip(limitDoc * Number(clone.page))
      } else dbQuery.limit(limitDoc)

      dbQuery.exec((err: any, doc: any) => {
        if (err) res.send(err)
        else
          res.status(200).json({
            total: count,
            page: Math.ceil(count / limitDoc),
            pageSize: doc.length,
            products: doc,
          })
      })
    }
  })
})

ProductRouter.get('/:id', (req,res)=>{
  const {id} = req.params

  Product.findById(id, (err: any, doc: any)=>{
    if(err) res.status(404).send(err)
    else if(!doc) res.status(404)
    else
      res.status(200).json(doc)
  })
})

export default ProductRouter
