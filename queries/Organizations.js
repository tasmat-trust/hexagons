import { gql } from 'graphql-request'

const getAllOrgs = gql`query{
  organizations {
  	name id
  }
}`

export {
  getAllOrgs
}