import { mergeResolvers } from '@graphql-tools/merge'

import Product from './product'
import User from './user'

const resolvers = mergeResolvers([Product, User])

export default resolvers
