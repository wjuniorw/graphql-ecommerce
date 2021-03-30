
const productResolvers = {
  Query: {
    product: (_, { id }, { db: { Product }}) => Product.findById(id),
    products: (_, args: any, { db: { Product }}) => Product.find(args),
  },
  Mutation: {
    product: (_, { data }, { db: { Product }}) => {
      return Product.create(data)
    },
    productUpdate: (_, { id, data }, { db: { Product }}) => {
      return Product.findByIdAndUpdate(id, data, { new: true })
    },
  },
  Product: {},
}

export default productResolvers
