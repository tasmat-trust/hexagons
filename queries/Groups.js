import { gql } from 'graphql-request';

const createGroupQuery = gql`
  mutation createNewGroup($name: String!, $orgId: ID!) {
    createGroup(data: { name: $name, organization: $orgId }) {
      data {
        attributes {
          name
          organization {
            data {
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

const getSingleGroup = gql`
  query getSingleGroup($orgId: ID!, $slug: String!) {
    groups(filters: { organization: { id: { eq: $orgId } }, slug: { eq: $slug } }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

// Get all groups with name and slug
const allGroups = gql`
  query getGroups($orgId: ID!) {
    groups(filters: { organization: { id: { eq: $orgId } } }) {
      data {
        id
        attributes {
          name
          slug
        }
      }
    }
  }
`;

const myGroups = gql`
  query getGroups($teacherId: ID!, $orgId: ID!) {
    groups(filters: { users: { id: { eq: $teacherId } }, organization: { id: { eq: $orgId } } }) {
      data {
        id
        attributes {
          name
          slug
        }
      }
    }
  }
`;

// duplicate of allGroups TODO
const getGroupsByOrg = gql`
  query getGroups($orgId: ID!) {
    groups(filters: { organization: { id: { eq: $orgId } } }) {
      data {
        id
        attributes {
          name
          slug
        }
      }
    }
  }
`;

const getGroupReport = gql`
  query GetGroupReport($groupId: ID!, $orgId: ID!) {
    groupReport(groupId: $groupId, orgId: $orgId) {
      name
      groupedSubjects {
        name
        subjects {
          slug
        }
      }
      pupils {
        name

        subjectReports {
          subject {
            slug
          }
          score
        }
      }
    }
  }
`;

export { getSingleGroup, createGroupQuery, allGroups, myGroups, getGroupsByOrg, getGroupReport };
