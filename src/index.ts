import { ApolloServer } from 'apollo-server'

import typeDefs from '~/schema'
import resolvers from '~/resolvers'

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

console.log('NODE_ENV====>', process.env.NODE_ENV)
console.log('SECRET====>', process.env.SECRET)
console.log('PORT from process.env', process.env.PORT)
