
const products = [
  {
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
    products: () => products,
  },
}

export default productResolvers
