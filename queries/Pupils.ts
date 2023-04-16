import { gql } from 'graphql-request';

const createPupilQuery = gql`
  mutation createPupil($name: String!, $orgId: ID!, $groupId: [ID!]) {
    createPupil(input: { data: { name: $name, groups: $groupId, organization: $orgId } }) {
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
  }
`;

const allPupilsWithGroups = gql`
  query getPupilsWithGroups($orgId: ID!) {
    pupils(where: { organization: $orgId }) {
      id
      name
      groups(where: { organization: $orgId }) {
        name
        id
      }
    }
  }
`;

const updatePupilGroups = gql`
  mutation updatePupil($userId: ID!, $groupIds: [ID]) {
    updatePupil(input: { where: { id: $userId }, data: { groups: $groupIds } }) {
      pupil {
        name
        groups {
          name
        }
      }
    }
  }
`;

const getPupilById = gql`
  query getPupil($id: ID, $orgId: ID!) {
    pupils(where: { id: $id, organization: $orgId }) {
      name
      id
      groups(where: { organization: $orgId }) {
        name
      }
      organization {
        school_type
      }
    }
  }
`;

const getPupilsByGroup = gql`
  query getAllPupilsByGroup($groupId: ID!, $orgId: ID!) {
    pupils(where: { groups: $groupId, organization: $orgId }) {
      name
      id
      groups(where: { organization: $orgId }) {
        name
        slug
      }
    }
  }
`;

const getLevels = gql`
  query getAllLevels($subjectId: ID!, $pupilId: ID!) {
    levels(where: { subject: $subjectId, pupil: $pupilId }) {
      id
      status
      wasQuickAssessed
      module {
        level
        order
        capabilities {
          text
          order
          id
        }
      }
      competencies {
        status
        capability_fk
      }
    }
  }
`;

const getLevelsForOverview = gql`
  query getLevelsForOverview($subjectId: ID!, $pupilId: ID!) {
    levels(where: { subject: $subjectId, pupil: $pupilId }) {
      status
      wasQuickAssessed
      module {
        level
        order
        capabilities {
          id
        }
      }
      competencies {
        status
        capability_fk
      }
    }
  }
`;

const getLevel = gql`
  query getLevel($subjectId: ID!, $pupilId: ID!, $moduleId: ID!) {
    levels(where: { subject: $subjectId, pupil: $pupilId, module: $moduleId }) {
      id
      status
      wasQuickAssessed
      competencies {
        id
        status
        capability_fk
      }
    }
  }
`;

const updateLevelQuery = gql`
  mutation updateLevel($levelId: ID!, $status: ENUM_LEVEL_STATUS!, $wasQuickAssessed: Boolean!) {
    updateLevel(
      input: {
        where: { id: $levelId }
        data: { status: $status, wasQuickAssessed: $wasQuickAssessed }
      }
    ) {
      level {
        id
        status
        wasQuickAssessed
      }
    }
  }
`;

const getCompetencies = gql`
  query getCompetencies($pupilId: ID!, $levelId: [ID!]) {
    competencies(where: { pupil: $pupilId, level: $levelId }) {
      id
      status
      capability_fk
    }
  }
`;

const getCompetency = gql`
  query getCompetency($pupilId: ID!, $capability_fk: Int!, $levelId: ID!) {
    competencies(where: { pupil: $pupilId, capability_fk: $capability_fk, level: $levelId }) {
      id
      status
      capability_fk
    }
  }
`;

const createCompetencyQuery = gql`
  mutation createCompetency(
    $pupilId: ID!
    $levelId: ID!
    $status: ENUM_COMPETENCY_STATUS!
    $capability_fk: Int!
    $capability_text: String!
  ) {
    createCompetency(
      input: {
        data: {
          pupil: $pupilId
          level: $levelId
          status: $status
          capability_fk: $capability_fk
          capability_text: $capability_text
        }
      }
    ) {
      competency {
        capability_text
        status
        capability_fk
        id
      }
    }
  }
`;

const updateCompetencyQuery = gql`
  mutation updateCompetency($id: ID!, $status: ENUM_COMPETENCY_STATUS!, $adaptation: String) {
    updateCompetency(
      input: { where: { id: $id }, data: { status: $status, adaptation: $adaptation } }
    ) {
      competency {
        id
      }
    }
  }
`;

const deleteLevelQuery = gql`
  mutation DeleteLevel($id: ID!) {
    deleteLevel(input: { where: { id: $id } }) {
      level {
        id
      }
    }
  }
`;

const deleteCompetencyQuery = gql`
  mutation DeleteCompetency($id: ID!) {
    deleteCompetency(input: { where: { id: $id } }) {
      competency {
        id
      }
    }
  }
`;

const deletePupil = gql`
  mutation DeletePupil($id: ID!) {
    deletePupil(input: { where: { id: $id } }) {
      pupil {
        id
      }
    }
  }
`;

const getForDeletionCompetencies = gql`
  query getCompetencies($pupilId: ID!) {
    competencies(where: { pupil: $pupilId }) {
      id
    }
  }
`;

const getForDeletionLevels = gql`
  query getLevels($pupilId: ID!) {
    levels(where: { pupil: $pupilId }) {
      id
    }
  }
`;

const createLevelQuery = gql`
  mutation createLevel(
    $pupilId: ID!
    $moduleId: ID!
    $subjectId: ID!
    $status: ENUM_LEVEL_STATUS!
    $wasQuickAssessed: Boolean
  ) {
    createLevel(
      input: {
        data: {
          pupil: $pupilId
          module: $moduleId
          subject: $subjectId
          status: $status
          wasQuickAssessed: $wasQuickAssessed
        }
      }
    ) {
      level {
        id
        status
        wasQuickAssessed
      }
    }
  }
`;

export {
  updateCompetencyQuery,
  getCompetency,
  getCompetencies,
  createLevelQuery,
  createCompetencyQuery,
  getLevel,
  deleteLevelQuery,
  deletePupil,
  deleteCompetencyQuery,
  getForDeletionCompetencies,
  getForDeletionLevels,
  getLevels,
  getLevelsForOverview,
  updateLevelQuery,
  getPupilById,
  getPupilsByGroup,
  createPupilQuery,
  allPupilsWithGroups,
  updatePupilGroups,
};
