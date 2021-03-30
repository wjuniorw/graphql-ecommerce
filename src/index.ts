require('dotenv').config()
import { ApolloServer } from 'apollo-server'
// import { mockServer } from 'graphql-tools'

import db from '~/db'
import typeDefs from '~/schema'
import resolvers from '~/resolvers'
import { getUser } from '~/utils/auth'

const context = async({ req }) => {
  const token = req.headers.authorization || ''
  const user = await getUser(token)
  return { db, user }
}

const server = new ApolloServer({ typeDefs, resolvers, context })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
