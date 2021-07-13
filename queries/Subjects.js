import { gql } from 'graphql-request'

// Get all users with roles and groups
const allSubjects = gql`query{
  subjects {
  	name slug
  }
}`

export {
  allSubjects
}