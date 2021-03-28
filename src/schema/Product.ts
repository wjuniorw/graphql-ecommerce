import { gql } from 'apollo-server'

const Product = gql`
  type Product {
    id: ID,
    name: String,
    price: Int,
    inStok: Int,
    size: String,
    type: String,
    stamp: String,
    thumb: String,
    category: String,
    images: [String],
    pretty_price: String,
  }

  type Query {
    products: [Product]
  }
`
export default Product
