import { gql } from 'graphql-request'

// Get all users with roles and groups
const allTeachers = gql`query getTeachers($orgId: Int!) {  
    users (where: {organization: $orgId}) { 
      username email id 
      organization {
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


const createTQuery = gql`
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


const createTeacherQuery = gql`mutation createUser($username: String!, $email: String!, $role: ID!, $orgId: ID!, $groupId: [ID!]) {createUser(input: {  data:{    username: $username,    email: $email, role: $role, groups:$groupId, organization:$orgId }  }) {  user { organization {id } groups {   id } role {   id }  }}}`


export {
  createTeacherQuery,
  allTeachers
}