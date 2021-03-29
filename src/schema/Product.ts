import { gql } from 'apollo-server'

const Product = gql`
  type Product {
    id: ID,
    name: String,
    price: Float,
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
    products: [Product],
    product(id: ID): Product,
  }

  type mutation {
    product(data: ProductInput): Product,
    productUpdate(data: ProductInput): Product,
  }

  input ProductInput {
    name: String,
    price: Float,
    inStok: Int,
    size: String,
    type: String,
    stamp: String,
    thumb: String,
    category: String,
    images: [String],
    pretty_price: String,
  }
`
export default Product
