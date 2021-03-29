require('dotenv').config()
import { ApolloServer } from 'apollo-server'
// import { mockServer } from 'graphql-tools'

import typeDefs from '~/schema'
import resolvers from '~/resolvers'

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
