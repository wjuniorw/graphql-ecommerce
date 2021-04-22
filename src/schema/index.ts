import { mergeTypeDefs } from '@graphql-tools/merge'
import Product from './Product'
import User from './User'
import Directives from './directives'
import Errors from './error'

const schemas = mergeTypeDefs([Directives, Errors, Product, User])

export default schemas
