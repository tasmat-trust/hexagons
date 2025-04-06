import { gql } from 'graphql-request';


const getAllSnapshots = gql`
  query getSnapshots {
    snapshots {
      data {
        id
        attributes {
          name
          targetDate
        }
      }
    }
  }
`;

const createSnapshotQuery = gql`
  mutation createSnapshot($name: String) {
    createSnapshot(data: { name: $name }) {
      data {
        id
        attributes {
          name
          targetDate
          targets {
            data {
              id
              attributes {
                initial_score
                target_score
              }
            }
          }
        }
      }
    }
  }
`;


export {
    createSnapshotQuery,
    getAllSnapshots
}