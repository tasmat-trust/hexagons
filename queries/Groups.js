import { gql } from 'graphql-request'

// Get all groups with name and slug
const allGroups = gql`query getGroups($orgId: Int!) {  
    groups (where: {organization: $orgId}) { 
      name slug id
    }
  }`

const myGroups = gql`query getGroups($teacherId: ID!) {  
  groups (where: {users_permissions_users: $teacherId}) { 
    name slug
  }
}`

export {
  allGroups,
  myGroups
}