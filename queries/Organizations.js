import { gql } from 'graphql-request'

const getAllOrgs = gql`query getAllOrgs{
  organizations {
  	name id
  }
}`

export {
  getAllOrgs
}