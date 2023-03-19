import { gql } from 'graphql-request'

const getAllOrgs = gql`query getAllOrgs{
  organizations {
  	name 
    id 
    email_domains 
    use_early_development 
    use_rainbow_awards
  }
}`
 

export {
  getAllOrgs
}