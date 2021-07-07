import { gql } from 'graphql-request'

// Get all users with roles and groups
const allTeachers = gql`query getTeachers($orgId: Int!) {  
    users (where: {organizations: $orgId}) { 
      username email id 
      organizations {
          name
      }
      role {
          name
      }
      groups {
          name
      }
    }
  }`


const createTeacherQuery = gql`
mutation createNewTeacher($username: String!, $email: String!,) {
    createUser(input: {
      data:{
        username:$username,
        email: $email
        }
      }) {
      user {
        username
        email
      }
    }      
}`


const createTQuery = gql`mutation createUser($username: String!, $email: String!, $role: ID!, $orgId: [ID!], $groupId: [ID!]) {
    createUser(input: {
      data:{
        username: $username,
        email: $email,
        role: $role,
        groups:$groupId,
        organizations:$orgId
        }
      }) {
      user {
        organizations {
          id
        }
        groups {
          id
        }
        role {
          id
        }
      }
    }
}`


export {
  createTeacherQuery,
  allTeachers
}