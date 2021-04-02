import { gql } from 'apollo-server'

const User = gql`
  type User {
    id: ID
    name: String
    email: String
    role: String
    password: String
    orders: [ID]
  }

  type Query {
    # users: [User] @hasRole(roles: ["ADMIN"])
    users: [User]
    user(id: ID): User
  }

  type Mutation {
    userRegister(data: UserInput): User
    userUpdate(id:ID data: UserInput): User
    userDelete(id:ID): UserDelResp
  }

  input UserInput {
    name: String
    email: String
    role: String
    password: String
  }

  type UserDelResp {
    ok: Boolean
    error: String
    message: String
  }
`
export default User
