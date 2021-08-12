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

const getSingleGroup = gql`query getGroup($orgId: Int!, $slug: String!) {  
  groups (where: {organization: $orgId, slug: $slug}) { 
    name id
  }
}`

// Get all groups with name and slug
const allGroups = gql`query getGroups($orgId: Int!) {  
    groups (where: {organization: $orgId}) { 
      name slug id
    }
  }`

const myGroups = gql`query getGroups($teacherId: ID!) {  
  groups (where: {users: $teacherId}) { 
    name slug
  }
}`

// duplicate of allGroups TODO
const getGroupsByOrg = gql`query getGroups($orgId: Int!) {  
  groups (where: {organization: $orgId}) { 
    name id slug
  }
}`

export {
  getSingleGroup,
  createGroupQuery,
  allGroups,
  myGroups,
  getGroupsByOrg
}