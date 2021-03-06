if (process.env.NODE_ENV === 'development') require('dotenv').config()
import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from '@graphql-tools/schema'
// import { mockServer } from 'graphql-tools'

import db from '~/db'
import typeDefs from '~/schema'
import resolvers from '~/resolvers'
import directiveResolvers from '~/resolvers/directives'

import { getUser } from '~/utils/auth'

const context = async ({ req }) => {
  const token = req.headers.authorization || ''
  const user = await getUser(token)
  return { db, user, req }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers,
})

const server = new ApolloServer({ context, schema })

server
  .listen({ port: process.env.PORT })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
  .catch((e) => console.log('<==server error==>', e.message))
