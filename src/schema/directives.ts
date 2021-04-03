import { gql } from 'apollo-server'

const Directives = gql`
  directive @hasRole(roles: [String]) on FIELD_DEFINITION
  directive @brCurrency on FIELD_DEFINITION
  directive @sensibleField(role: String) on FIELD_DEFINITION
  #directive @hasRole(roles: [String]) on QUERY | FIELD_DEFINITION
  #directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    MANAGER
    CUSTOMER
  }
`
export default Directives
