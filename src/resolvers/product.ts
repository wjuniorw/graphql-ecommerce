
const products = [
  {
    _id: '1hb23j4b3hj4b4hj2'
    name: 'Love Cup',
    price: 50,
    inStok: 2,
    category: '',
    thumb: '',
    images: [],
    size: 'G',
    type: 'something',
    stamp: 'sunflower',
    pretty_price: (25.50 + 25.50).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
  }
]

const productResolvers = {
  Query: {
    product: (root, { id }) => products.find(it => it._id == id),
    products: () => products,
  },
}

export default productResolvers
