import { mergeTypeDefs } from '@graphql-toolkit/schema-merging'
import Product from './Product'

const schemas = mergeTypeDefs([Product])

export default schemas
