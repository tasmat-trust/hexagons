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

const createTeacherQuery = gql`
mutation createUser( 
  $username: String!, 
  $email: String!, 
  $role: ID!, 
  $orgId: ID!, 
  $password: String!,
  $groupId: [ID!],
  $confirmed: Boolean!
) 
{createUser(input: {  
  data: {     
    username: $username,    
    email: $email, 
    role: $role, 
    groups:$groupId, 
    organization:$orgId,
    password: $password,
    confirmed: $confirmed
  }  
}) {  
  user { 
    organization { id }
    groups { id } 
    role {   id }  }
  }
}`

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

const updateTeacherRole = gql`
mutation updateUser($userId: ID!, $roleId: ID!) {
  updateUser(
    input: {
      where: {id: $userId},
      data: { role: $roleId}
    }
  ) {
    user {
      username
      role {
        id
      }
    }
  }
}
`

export {
  updateTeacherGroups,
  updateTeacherRole,
  createTeacherQuery,
  allTeachers
}