import { gql } from 'graphql-request';

// Get all users with roles and groups
const allSubjectsQuery = gql`
  query getSubjects {
    subjects {
      data {
        id
        attributes {
          name
          slug
          isCore
          isChildOf
          isTransition
          isRainbowAwards
          isFunctionalSkills
          isEarlyDevelopment
          organization {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

const allRainbowAwardsQuery = gql`
  query getRainbowAwardsSubjects {
    subjects(filters: { isRainbowAwards: { eq: true } }) {
      data {
        id
        attributes {
          name
          slug
          isCore
          isChildOf
          organization {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

const allFunctionalSkillsQuery = gql`
  query getFunctionalSkillsSubjects {
    subjects(filters: { isFunctionalSkills: { eq: true } }) {
      data {
        id
        attributes {
          name
          slug
          isCore
          isChildOf
          organization {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

const allEarlyDevelopmentQuery = gql`
  query getEarlyDevelopmentSubjects {
    subjects(filters: { isEarlyDevelopment: { eq: true } }) {
      data {
        id
        attributes {
          name
          slug
          isCore
          isChildOf
          organization {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

const getCoreSubjects = gql`
  query getCoreSubjects {
    subjects(filters: { isCore: { eq: true } }) {
      data {
        id
        attributes {
          name
          slug
          isTransition
          isExpressiveAndReceptiveLanguage
        }
      }
    }
  }
`;

const getSingleSubjectBySlug = gql`
  query getSingleSubjectBySlug($slug: String!) {
    subjects(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          name
          slug
          excludeEarlyDevelopmentStep
          isRainbowAwards
          organization {
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

const getCapability = gql`
  query getCapability($id: ID!) {
    capabilities(filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          text
          guidance {
            data {
              attributes {
                text
                users_permissions_user {
                  data {
                    id
                    attributes {
                      username
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getModules = gql`
  query getModules($subjectId: ID!) {
    modules(filters: { subject: { id: { eq: $subjectId } } }) {
      data {
        id
        attributes {
          order
          level
          summary
          guidance
          capabilities {
            data {
              id
              attributes {
                order
                text
                guidance {
                  data {
                    id
                    attributes {
                      text
                      createdAt
                      users_permissions_user {
                        data {
                          id
                          attributes {
                            username
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getEdModules = gql`
  query getEdModules($subjectId: ID!) {
    modules(filters: { subject: { id: { eq: $subjectId } } }) {
      data {
        id
        attributes {
          order
          level
          summary
          guidance
          capabilities {
            data {
              id
              attributes {
                text
                guidance {
                  data {
                    id
                    attributes {
                      text
                      createdAt
                      users_permissions_user {
                        data {
                          id
                          attributes {
                            username
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const createModuleQuery = gql`
  mutation createModule($level: ENUM_MODULE_LEVEL!, $order: Int!, $subject: ID!, $summary: String) {
    createModule(data: { level: $level, order: $order, subject: $subject, summary: $summary }) {
      data {
        id
        attributes {
          level
          order
          summary
          subject {
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

const updateSummaryTextQuery = gql`
  mutation updateModule($summary: String!, $module: ID!) {
    updateModule(id: $module, data: { summary: $summary }) {
      data {
        id
        attributes {
          summary
        }
      }
    }
  }
`;

const createCapabilityQuery = gql`
  mutation createCapability($text: String!, $order: Int!, $module: ID!) {
    createCapability(data: { text: $text, order: $order, module: $module }) {
      data {
        attributes {
          text
          order
          module {
            data {
              attributes {
                level
                order
              }
            }
          }
        }
      }
    }
  }
`;

const updateCapabilityTextQuery = gql`
  mutation updateCapability($text: String!, $capability: ID!) {
    updateCapability(id: $capability, data: { text: $text }) {
      data {
        id
        attributes {
          text
        }
      }
    }
  }
`;

const deleteCapabilityQuery = gql`
  mutation DeleteCapability($id: ID!) {
    deleteCapability(id: $id) {
      data {
        id
      }
    }
  }
`;

const deleteModuleQuery = gql`
  mutation DeleteModule($id: ID!) {
    deleteModule(id: $id) {
      data {
        id
      }
    }
  }
`;

const createGuidanceQuery = gql`
  mutation createGuidance($text: String!, $capability: ID!, $userId: ID!) {
    createGuidance(
      data: { text: $text, capability: $capability, users_permissions_user: $userId }
    ) {
      data {
        id
        attributes {
          text
          createdAt
          users_permissions_user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;

const deleteGuidanceQuery = gql`
  mutation DeleteGuidance($id: ID!) {
    deleteGuidance(id: $id) {
      data {
        id
      }
    }
  }
`;

export {
  allRainbowAwardsQuery,
  allEarlyDevelopmentQuery,
  allFunctionalSkillsQuery,
  getCoreSubjects,
  deleteCapabilityQuery,
  createCapabilityQuery,
  updateCapabilityTextQuery,
  deleteModuleQuery,
  createModuleQuery,
  updateSummaryTextQuery,
  getSingleSubjectBySlug,
  allSubjectsQuery,
  getModules,
  getEdModules,
  createGuidanceQuery,
  deleteGuidanceQuery,
  getCapability,
};
