import { gql } from 'apollo-server'

const Product = gql`
  type Product {
    id: ID
    name: String
    price: Float
    inStok: Int
    size: String
    type: String
    stamp: String
    thumb: String
    category: String
    images: [String]
    pretty_price: String @brCurrency
  }

  type Query {
    # products: [Product] @hasRole(roles: ["ADMIN"])
    products: [Product]
    product(id: ID): Product
  }

  type Mutation {
    product(data: ProductInput): Product @hasRole(roles: ["ADMIN"])
    productUpdate(id:ID data: ProductInput): Product
    productDelete(id:ID): ProductDelResp
  }

  input ProductInput {
    name: String
    price: Float
    inStok: Int
    size: String
    type: String
    stamp: String
    thumb: String
    category: String
    images: [String]
    pretty_price: String
  }

  type ProductsResponse {
    ok: Boolean
    message: String
    data: [Product]
  }

  type ProductDelResp {
    ok: Boolean
    error: String
    message: String
  }
`
export default Product
