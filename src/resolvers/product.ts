import { Context } from './types'

const productResolvers = {
  Query: {
    product: (_, { id }, { db: { Product } }: Context) => Product.findById(id),
    products: (_, args: any, { db: { Product } }: Context) => {
      return Product.find(args)
    },
  },
  Mutation: {
    product: (_, { data }, { db: { Product } }: Context) => {
      return Product.createProduct(data)
    },
    productUpdate: (_, { id, data }, { db: { Product } }: Context) => {
      return Product.findByIdAndUpdate(id, data, { new: true })
    },
  },
  Product: {},
}

export default productResolvers
