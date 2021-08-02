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
mutation updatePupil($userId: ID!, $groupIds: [ID!]) {
  updatePupil(
    input: {
      where: {id: $userId},
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

const getPupilById = gql`query getPupil($id: ID, $orgId: ID!) {  
  pupils (where: {id: $id, organization: $orgId}) { 
    name id,
     groups {
      name
    }
    organization {
      school_type
    }
  }
}`


const getPupilsByGroup = gql`query getPupils($groupId: ID!) {  
  pupils (where: {groups: $groupId}) { 
    name id, groups {
      name
    }
  }
}`

const getLevels = gql`query getLevels($subjectId: ID!, $pupilId: ID!) {  
  levels (where: {subject: $subjectId, pupil: $pupilId}) { 
    id status,
    module {
      level order, 
      capabilities {
        text order id
      }
    }
    competencies {
      status capability_fk
    }
  }
}`

const getCompetencies = gql`query getCompetencies($pupilId: ID!, $subjectId: ID!) {  
  competencies (where: {pupil: $pupilId, subject: $subjectId}) {
    status capability_fk    
  }
}`


const getCompetency = gql`query getCompetency($pupilId: ID!, $capability_fk: Int!) {  
  competencies (where: {pupil: $pupilId, capability_fk: $capability_fk}) {
    id 
  }
}`

const createCompetencyQuery = gql`
mutation createCompetency($pupilId: ID!, $subjectId: ID!, $levelId: ID, $status: ENUM_COMPETENCY_STATUS!, $adaptation: String!, $capability_fk: Int!, $capability_text: String!) {
  createCompetency(input: {
      data:{
        pupil:$pupilId,
        level: $levelId,
        subject: $subjectId,
        status:$status,
        adaptation: $adaptation,
        capability_fk: $capability_fk,
        capability_text: $capability_text
        }
      }) {
      competency {
        capability_text status
      }
    }      
}`

const updateCompetencyQuery = gql`
mutation updateCompetency( $id: ID!, $status: ENUM_COMPETENCY_STATUS!, $adaptation: String) {
  updateCompetency(input: {
      where: {
        id: $id
      } 
      data:{
        status:$status,
        adaptation: $adaptation
        }
      }) {
      competency {
        id
      }
    }      
}`




const createLevelQuery = gql`
mutation createLevel($pupilId: ID!, $moduleId: ID!, $subjectId:ID!, $status: ENUM_LEVEL_STATUS!) {
  createLevel(input: {
      data:{
        pupil:$pupilId,
        module: $moduleId,
        subject:$subjectId,
        status: $status
        }
      }) {
      level {
        id
      }
    }      
}`

export {
  updateCompetencyQuery,
  getCompetency,
  getCompetencies,
  createLevelQuery,
  createCompetencyQuery,
  getLevels,
  getPupilById,
  getPupilsByGroup,
  createPupilQuery,
  allPupilsWithGroups,
  updatePupilGroups
}