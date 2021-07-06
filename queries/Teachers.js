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

const createTeacherQuery = gql`mutation createUser($username: String!, $email: String!) {
    createUser(input: {
      data:{
        username: $username,
        email: $email
        }
      }) {
      user {
        username email
      }
    }
}`


export {
  createTeacherQuery,
  allTeachers
}