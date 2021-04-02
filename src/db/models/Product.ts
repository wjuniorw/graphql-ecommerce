import mongoose from '../connections'
import Paginate from 'mongoose-paginate-v2'

const { Schema } = mongoose
const ProductSchema = new Schema({
  name: String,
  price: Number,
  inStok: Number,
  size: String,
  type: String,
  stamp: String,
  thumb: String,
  category: String,
  images: [String],
  pretty_price: String,
},
{
  timestamps: true,
})

const searchable = {
  'name': 'text',
  'type': 'text',
  'category': 'text',
  'pretty_price': 'text',
}

ProductSchema.plugin(Paginate)
// ProductSchema.path('name').index({text : true})
// ProductSchema.index({ '$**': 'text' }, { default_language: 'portuguese' })
ProductSchema.index(searchable, { default_language: 'portuguese' })

const Product = mongoose.model(
  'Product', ProductSchema
)

export default Product
