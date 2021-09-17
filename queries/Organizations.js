import { gql } from 'graphql-request'

const getAllOrgs = gql`query getAllOrgs{
  organizations {
  	name id email_domains
  }
}`

export {
  getAllOrgs
}