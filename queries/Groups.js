import { gql } from 'graphql-request'

const createGroupQuery = gql`
mutation createNewGroup($name: String!, $orgId: ID!) {
    createGroup(input: {
      data:{
        name:$name,
        organization:$orgId
        }
      }) {
      group {
        name
        organization {
          name
        }
      }
    }      
}`

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

const getGroupsByOrg = gql`query getGroups($orgId: Int!) {  
  groups (where: {organization: $orgId}) { 
    name id slug
  }
}`

export {
  createGroupQuery,
  allGroups,
  myGroups,
  getGroupsByOrg
}