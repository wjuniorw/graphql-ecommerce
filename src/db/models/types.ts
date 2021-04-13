import { Document, Model, Types } from 'mongoose'

type ID = Types.ObjectId

export interface IProduct {
  name: string
  price: number
  inStok: number
  size: string
  type: string
  stamp: string
  thumb: string
  category: string
  images: string[]
  pretty_price?: string
}

export interface ProductDoc extends IProduct, Document {
  name: string
  price: number
  inStok: number
  size: string
  type: string
  stamp: string
  thumb: string
  category: string
  images: string[]
  pretty_price: string
}

export interface ProductInterface extends Model<ProductDoc> {
  createProduct(product: IProduct): Promise<ProductDoc>
}
