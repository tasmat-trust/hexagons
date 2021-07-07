import { gql } from 'graphql-request'

const createPupilQuery = gql`
  mutation createPupil($name: String!, $orgId: ID!, $groupId: [ID!]) {
    createPupil(input: {
      data:{
        name:$name,
        groups:$groupId,
        organization:$orgId
        }
      }) {
      pupil {
        name
        groups {
          name
        }
        organization {
          name
        }
      }
    }      
  }`

const allPupilsWithGroups = gql`query getPupilsWithGroups($orgId: ID!){pupils (where: {organization: $orgId}){  id, name, groups {name, id}} }`

const updatePupilGroups = gql`
mutation updatePupil($pupilId: ID!, $groupIds: [ID!]) {
  updatePupil(
    input: {
      where: {id: $pupilId},
      data: { groups: $groupIds}
    }
  ) {
    pupil {
      name
      groups {
        name
      }
    }
  }
}
`

export {
  createPupilQuery,
  allPupilsWithGroups,
  updatePupilGroups
}