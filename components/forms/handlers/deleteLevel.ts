import { deleteLevelQuery } from '../../../queries/Pupils';

async function deleteLevel(gqlClient, variables) {
  try {
    const data = await gqlClient.request(deleteLevelQuery, variables);
    if (data) {
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

export { deleteLevel };
