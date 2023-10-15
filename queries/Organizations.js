import { gql } from 'graphql-request';

const getAllOrgs = gql`
  query getAllOrgs {
    organizations {
      data {
        id
        attributes {
          name
          email_domains
          use_early_development
          use_rainbow_awards
        }
      }
    }
  }
`;

export { getAllOrgs };
