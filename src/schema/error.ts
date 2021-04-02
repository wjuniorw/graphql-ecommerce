import { gql } from 'apollo-server'

const ErrorResp = gql`
  type Error {
    ok: Boolean,
    message: String
  }

  # type ProductsResponse {
  #   ok: Boolean
  #   message: String
  #   data: [Product]
  # }

`
export default ErrorResp
