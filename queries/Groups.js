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

const getSingleGroup = gql`query getSingleGroup($orgId: Int!, $slug: String!) {  
  groups (filters: {organization: $orgId, slug: $slug}) { 
    name id
  }
}`

// Get all groups with name and slug
const allGroups = gql`query getGroups($orgId: OrganizationFiltersInput) {  
    groups (filters: {organization: $orgId}) {       
      data {
        id
        attributes {
          name
          slug
        }
      }
    }
  }`

const myGroups = gql`query getGroups($teacherId: UsersPermissionsUserFiltersInput!, $orgId: OrganizationFiltersInput!) {  
  groups (filters: {users: $teacherId, organization: $orgId}) {      
    data {
      id
      attributes {
        name
        slug
      }
    }
  }
}`

// duplicate of allGroups TODO
const getGroupsByOrg = gql`query getGroups($orgId: Int!) {  
  groups (filters: {organization: $orgId}) { 
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