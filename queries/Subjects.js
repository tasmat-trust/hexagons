import { gql } from 'graphql-request'

// Get all users with roles and groups
const allSubjects = gql`query{
  subjects {
  	name slug isCore
  }
}`

const getCoreSubjects = gql`query{  
  subjects (where: { isCore: true}) { 
     id name slug
  }
}`



const getSingleSubjectBySlug = gql`query getSubject($slug: String!) {  
  subjects (where: { slug: $slug}) { 
     id name slug
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

const getModules = gql`query getModules($subjectId: ID!) {  
  modules (where: {subject: $subjectId}) { 
    order id level summary guidance, 
    capabilities {
      text id
    }
  }
}`



const createModuleQuery = gql`
mutation createModule($level: ENUM_MODULE_LEVEL!, $order: Int!, $subject: ID!, $summary: String, $guidance: String) {
    createModule(input: {
      data:{
        level:$level,
        order:$order,
        subject: $subject,
        summary: $summary,
        guidance: $guidance
        }
      }) {
      module {
        level order id summary guidance
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

export {
  getCoreSubjects,
  deleteCapabilityQuery,
  createCapabilityQuery,
  deleteModuleQuery,
  createModuleQuery,
  getSingleSubjectBySlug,
  allSubjects,
  getModules
}