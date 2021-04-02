import bcrypt from 'bcrypt'

const hashingPass = async(pass: string) => {
  try {
    const hash = await bcrypt.hash(pass, 11)
    console.log('hashingPass=====>', hash)
    return hash
  }
  catch (e) {
    console.log('error hashingPass=====>', e.message)
  }
}

const productResolvers = {
  Query: {
    user: (_, { id }, { db: { User }}) => User.findById(id),
    users: (_, args: any, { db: { User }}) => User.find(args),
  },
  Mutation: {
    userRegister: async(_, { data }, { db: { User }}) => {
      data.password = await hashingPass(data.password)
      return User.create(data)
    },
    userUpdate: (_, { id, data }, { db: { User }}) => {
      return User.findByIdAndUpdate(id, data, { new: true })
    },
  },
  User: {},
}

export default productResolvers
