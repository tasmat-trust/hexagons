import { deleteCompetencyQuery } from '../../../queries/Pupils';

async function deleteCompetency(gqlClient, variables) {
  try {
    const data = await gqlClient.request(deleteCompetencyQuery, variables);
    if (data) {
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

export { deleteCompetency };
