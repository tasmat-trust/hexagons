import { gql } from 'graphql-request';

const createPupilQuery = gql`
  mutation createPupil($name: String!, $orgId: ID!, $groupId: [ID!]) {
    createPupil(data: { name: $name, groups: $groupId, organization: $orgId }) {
      data {
        attributes {
          name
          groups {
            data {
              attributes {
                name
              }
            }
          }
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

const allPupilsWithGroups = gql`
  query getPupilsWithGroups($orgId: ID!) {
    pupils(filters: { organization: { id: { eq: $orgId } } }) {
      data {
        id
        attributes {
          name
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

const updatePupilGroups = gql`
  mutation updatePupil($userId: ID!, $groupIds: [ID]) {
    updatePupil(id: $userId, data: { groups: $groupIds }) {
      data {
        attributes {
          name
          groups {
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

const getPupilById = gql`
  query getPupil($id: ID, $orgId: ID!) {
    pupils(filters: { id: { eq: $id }, organization: { id: { eq: $orgId } } }) {
      data {
        id
        attributes {
          name
          groups {
            data {
              attributes {
                name
              }
            }
          }
          organization {
            data {
              attributes {
                school_type
              }
            }
          }
        }
      }
    }
  }
`;

const getPupilsByGroup = gql`
  query getAllPupilsByGroup($groupId: ID!, $orgId: ID!) {
    pupils(filters: { groups: { id: { eq: $groupId } }, organization: { id: { eq: $orgId } } }) {
      data {
        id
        attributes {
          name
          groups {
            data {
              attributes {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;

const getLevels = gql`
  query getAllLevels($subjectId: ID!, $pupilId: ID!) {
    levels(filters: { subject: { id: { eq: $subjectId } }, pupil: { id: { eq: $pupilId } } }) {
      data {
        id
        attributes {
          status
          wasQuickAssessed
          percentComplete
          module {
            data {
              attributes {
                level
                order
                capabilities {
                  data {
                    id
                    attributes {
                      text
                      order
                    }
                  }
                }
              }
            }
          }
          competencies {
            data {
              attributes {
                status
                capability_fk
              }
            }
          }
        }
      }
    }
  }
`;

const getLevelsForOverview = gql`
  query getLevelsForOverview($subjectId: ID!, $pupilId: ID!) {
    levels(filters: { subject: { id: { eq: $subjectId } }, pupil: { id: { eq: $pupilId } } }) {
      data {
        attributes {
          status
          wasQuickAssessed
          percentComplete
          module {
            data {
              attributes {
                level
                order
                capabilities {
                  data {
                    id
                  }
                }
              }
            }
          }
          competencies {
            data {
              attributes {
                status
                capability_fk
              }
            }
          }
        }
      }
    }
  }
`;

const getLevel = gql`
  query getLevel($subjectId: ID!, $pupilId: ID!, $moduleId: ID!) {
    levels(
      filters: {
        subject: { id: { eq: $subjectId } }
        pupil: { id: { eq: $pupilId } }
        module: { id: { eq: $moduleId } }
      }
    ) {
      data {
        id
        attributes {
          status
          wasQuickAssessed
          competencies {
            data {
              id
              attributes {
                status
                capability_fk
              }
            }
          }
        }
      }
    }
  }
`;

const updateLevelQuery = gql`
  mutation updateLevel($levelId: ID!, $status: ENUM_LEVEL_STATUS!, $wasQuickAssessed: Boolean!) {
    updateLevel(id: $levelId, data: { status: $status, wasQuickAssessed: $wasQuickAssessed }) {
      data {
        id
        attributes {
          status
          wasQuickAssessed
        }
      }
    }
  }
`;

const getCompetencies = gql`
  query getCompetencies($pupilId: ID!, $levelId: ID!) {
    competencies(filters: { pupil: { id: { eq: $pupilId } }, level: { id: { eq: $levelId } } }) {
      data {
        id
        attributes {
          status
          capability_fk
        }
      }
    }
  }
`;

const getCompetency = gql`
  query getCompetency($pupilId: ID!, $capability_fk: Int!, $levelId: ID!) {
    competencies(
      filters: {
        pupil: { id: { eq: $pupilId } }
        capability_fk: { eq: $capability_fk }
        level: { id: { eq: $levelId } }
      }
    ) {
      data {
        id
        attributes {
          status
          capability_fk
        }
      }
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
      data: {
        pupil: $pupilId
        level: $levelId
        status: $status
        capability_fk: $capability_fk
        capability_text: $capability_text
      }
    ) {
      data {
        id
        attributes {
          capability_text
          status
          capability_fk
        }
      }
    }
  }
`;

const updateCompetencyQuery = gql`
  mutation updateCompetency($id: ID!, $status: ENUM_COMPETENCY_STATUS!, $adaptation: String) {
    updateCompetency(id: $id, data: { status: $status, adaptation: $adaptation }) {
      data {
        id
      }
    }
  }
`;

const deleteLevelQuery = gql`
  mutation DeleteLevel($id: ID!) {
    deleteLevel(id: $id) {
      data {
        id
      }
    }
  }
`;

const deleteCompetencyQuery = gql`
  mutation DeleteCompetency($id: ID!) {
    deleteCompetency(id: $id) {
      data {
        id
      }
    }
  }
`;

const deletePupil = gql`
  mutation DeletePupil($id: ID!) {
    deletePupil(id: $id) {
      data {
        id
      }
    }
  }
`;

const getForDeletionCompetencies = gql`
  query getCompetencies($pupilId: ID!) {
    competencies(filters: { pupil: { id: { eq: $pupilId } } }) {
      data {
        id
      }
    }
  }
`;

const getForDeletionLevels = gql`
  query getLevels($pupilId: ID!) {
    levels(filters: { pupil: { id: { eq: $pupilId } } }) {
      data {
        id
      }
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
      data: {
        pupil: $pupilId
        module: $moduleId
        subject: $subjectId
        status: $status
        wasQuickAssessed: $wasQuickAssessed
      }
    ) {
      data {
        id
        attributes {
          status
          wasQuickAssessed
        }
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
