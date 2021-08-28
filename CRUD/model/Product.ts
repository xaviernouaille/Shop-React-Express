import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    prix: Number,
    categorie: String,
    img: String,
  },
  { versionKey: false }
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
