import { mergeResolvers } from '@graphql-tools/merge'

import Product from './product'

const resolvers = mergeResolvers([Product])

export default resolvers
