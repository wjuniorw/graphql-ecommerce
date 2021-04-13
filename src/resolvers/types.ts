import { ProductInterface } from 'db/models/types'

interface Db {
  Product: ProductInterface
  User: any
}
export interface Context {
  user: any
  req: any
  db: Db
}
