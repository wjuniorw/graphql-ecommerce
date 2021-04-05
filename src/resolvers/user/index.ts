import { createUser } from './helpers'

const productResolvers = {
  Query: {
    user: (_: any, { id }, { db: { User } }) => User.findById(id),
    users: (_: any, args: any, { db: { User } }) => User.find(args),
  },
  Mutation: {
    userRegister: async (_: any, { data }, { db: { User } }) => {
      return createUser(data, User)
    },
    userUpdate: (_: any, { id, data }, { db: { User } }) => {
      return User.findByIdAndUpdate(id, data, { new: true })
    },
  },
  User: {},
}

export default productResolvers
