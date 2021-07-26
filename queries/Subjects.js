import { gql } from 'graphql-request'

// Get all users with roles and groups
const allSubjects = gql`query{
  subjects {
  	name slug
  }
}`

const getSingleSubjectBySlug = gql`query getSubject($slug: String!) {  
  subjects (where: { slug: $slug}) { 
     id name
  }
}`


const getModule = gql`query getModule($level: ENUM_MODULE_LEVEL!, $order: Int!, $subjectId: ID!) {  
  modules (where: {subject: $subjectId, order: $order, level: $level}) { 
    order id,
    subject {
      name id
    }
  }
}`

const getModules = gql`query getModules($level: ENUM_MODULE_LEVEL!, $subjectId: ID!) {  
  modules (where: {subject: $subjectId, level: $level}) { 
    order, 
    capabilities {
      text
    }
  }
}`

const createModuleQuery = gql`
mutation createModule($level: ENUM_MODULE_LEVEL!, $order: Int!, $subject: ID!) {
    createModule(input: {
      data:{
        level:$level,
        order:$order,
        subject: $subject
        }
      }) {
      module {
        level order
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


export {
  createCapabilityQuery,
  createModuleQuery,
  getSingleSubjectBySlug,
  allSubjects,
  getModules
}