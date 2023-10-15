import { gql } from 'graphql-request';

const singleTeacher = gql`
  query getTeacher($email: String!) {
    usersPermissionsUsers(filters: { email: { eq: $email } }) {
      data {
        id
      }
    }
  }
`;

// Get all users with roles and groups
const allTeachers = gql`
  query getAllTeachers($orgId: ID!) {
    usersPermissionsUsers(filters: { organization: { id: { eq: $orgId } } }) {
      data {
        id
        attributes {
          username
          email

          organization {
            data {
              attributes {
                name
              }
            }
          }
          role {
            data {
              attributes {
                name
              }
            }
          }
          groups {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const createTeacherQuery = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $role: ID!
    $orgId: ID!
    $password: String!
    $groupId: [ID!]
    $confirmed: Boolean!
  ) {
    createUsersPermissionsUser(
      data: {
        username: $username
        email: $email
        role: $role
        groups: $groupId
        organization: $orgId
        password: $password
        confirmed: $confirmed
      }
    ) {
      data {
        attributes {
          organization {
            data {
              id
            }
          }
          groups {
            data {
              id
            }
          }
          role {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

const updateTeacherGroups = gql`
  mutation updateUser($userId: ID!, $groupIds: [ID]) {
    updateUsersPermissionsUser(id: $userId, data: { groups: $groupIds }) {
      data {
        attributes {
          username
          groups {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const updateTeacherRole = gql`
  mutation updateUser($userId: ID!, $roleId: ID!) {
    updateUsersPermissionsUser(id: $userId, data: { role: $roleId }) {
      data {
        attributes {
          username
          role {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

const emailTeacherCredentials = gql`
  mutation createUserPasswordGenerator(
    $email: String!
    $username: String!
    $loginUrl: String!
    $password: String!
    $role: String!
  ) {
    createUserPasswordGenerator(
      data: {
        email: $email
        username: $username
        loginUrl: $loginUrl
        password: $password
        role: $role
      }
    ) {
      data {
        attributes {
          email
        }
      }
    }
  }
`;

export {
  singleTeacher,
  emailTeacherCredentials,
  updateTeacherGroups,
  updateTeacherRole,
  createTeacherQuery,
  allTeachers,
};
