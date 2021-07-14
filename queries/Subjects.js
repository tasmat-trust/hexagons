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


const getModule = gql`query getModule($level: String!, $subjectId: ID!) {  
  modules (where: {subject: $subjectId, level: $level}) { 
    order, 
    capabilities {
      text
    }
  }
}`


export {
  getSingleSubjectBySlug,
  allSubjects,
  getModule
}