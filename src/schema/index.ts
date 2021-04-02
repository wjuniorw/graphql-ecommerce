import { mergeTypeDefs } from '@graphql-toolkit/schema-merging'
import Product from './Product'
import User from './User'
import Directives from './directives'
import Errors from './error'

const schemas = mergeTypeDefs([Directives, Errors, Product, User])

export default schemas
