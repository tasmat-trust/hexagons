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

const createTeacherQuery = gql`mutation createUser($username: String!, $email: String!, $role: ID!, $orgId: ID!, $groupId: [ID!]) {createUser(input: {  data:{    username: $username,    email: $email, role: $role, groups:$groupId, organization:$orgId }  }) {  user { organization {id } groups {   id } role {   id }  }}}`

const updateTeacherGroups = gql`
mutation updateUser($userId: ID!, $groupIds: [ID]) {
  updateUser(
    input: {
      where: {id: $userId},
      data: { groups: $groupIds}
    }
  ) {
    user {
      username
      groups {
        name
      }
    }
  }
}
`

export {
  updateTeacherGroups,
  createTeacherQuery,
  allTeachers
}