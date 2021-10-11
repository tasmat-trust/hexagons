import { gql } from 'graphql-request'

// Get all users with roles and groups
const allSubjectsQuery = gql`query getSubjects{
  subjects {
  	name slug isCore isChildOf isEarlyDevelopment isRainbowAwards
  }
}`

const allRainbowAwardsQuery = gql`query getRainbowAwardsSubjects{
  subjects  (where: { isRainbowAwards: true}){
  	name slug
  }
}`

const getCoreSubjects = gql`query getCoreSubjects {  
  subjects (where: { isCore: true}) { 
     id name slug isEarlyDevelopment isExpressiveAndReceptiveLanguage
  }
}`



const getSingleSubjectBySlug = gql`query getSingleSubjectBySlug($slug: String!) {  
  subjects (where: { slug: $slug}) { 
     id name slug
  }
}`


const getCapability = gql`query getCapability($id: ID!) {  
  capabilities (where: {id: $id}) { 
    text id,
    guidance {
          text
          users_permissions_user {
            username
          }
        }
  }
}`

const getModules = gql`query getModules($subjectId: ID!) {  
  modules (where: {subject: $subjectId}) { 
    order id level summary guidance, 
    capabilities {
      text id,
        guidance {
          text created_at,
          users_permissions_user {
            username
          }
        }
    }
  }
}`

const getEdModules = gql`query getEdModules($subjectId: ID!) {  
  modules (where: {subject: $subjectId}) { 
    order id level summary guidance, 
    capabilities {
      text id,
        guidance {
          text created_at,
          users_permissions_user {
            username
          }
        }
    }
  }
}`



const createModuleQuery = gql`
mutation createModule($level: ENUM_MODULE_LEVEL!, $order: Int!, $subject: ID!, $summary: String) {
    createModule(input: {
      data:{
        level:$level,
        order:$order,
        subject: $subject,
        summary: $summary
        }
      }) {
      module {
        level order id summary
        subject {
          name id
        }
      }
    }      
}`

const createCapabilityQuery = gql`
mutation createCapability($text: String!, $order: Int!, $module: ID!) {
  createCapability(input: {
      data:{
        text:$text,
        order:$order,
        module: $module
        }
      }) {
      capability {
        text order
        module {
          level order
        }
      }
    }      
}`

const deleteCapabilityQuery = gql`
mutation DeleteCapability($id: ID!) {
  deleteCapability(input: {
    where: {
      id: $id
    }
  }) {
    capability {
      id
    }
  }
}`

const deleteModuleQuery = gql`
mutation DeleteModule($id: ID!) {
  deleteModule(input: {
    where: {
      id: $id
    }
  }) {
    module {
      id
    }
  }
}`

const createGuidanceQuery = gql`
mutation createGuidance($text: String!, $capability: ID!, $userId: ID!) {
  createGuidance(input: {
    data: {
      text: $text,      
      capability: $capability,
      users_permissions_user: $userId
    }
  }) {
    guidance {
      text id created_at,
      users_permissions_user {
        username
      }
    }
  }
}
`

export {
  allRainbowAwardsQuery,
  getCoreSubjects,
  deleteCapabilityQuery,
  createCapabilityQuery,
  deleteModuleQuery,
  createModuleQuery,
  getSingleSubjectBySlug,
  allSubjectsQuery,
  getModules,
  getEdModules,
  createGuidanceQuery,
  getCapability
}