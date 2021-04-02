import { gql } from 'apollo-server'

const User = gql`
  type User {
    id: ID
    name: String
    email: String
    role: String
    password: String
  }

  type Query {
    users: [User] @hasRole(roles: ["ADMIN"])
    user(id: ID): User @hasRole(roles: ["ADMIN", "MANAGER"])
  }

  type Mutation {
    userRegister(data: UserInput): User @hasRole(roles: ["ADMIN"])
    userUpdate(id:ID data: UserInput): User @hasRole(roles: ["ADMIN", "MANAGER"])
    userDelete(id:ID): UserDelResp @hasRole(roles: ["ADMIN"])
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
