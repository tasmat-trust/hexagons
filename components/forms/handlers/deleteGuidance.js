import { deleteGuidanceQuery } from '../../../queries/Subjects';

async function deleteGuidance(guidanceId, gqlClient) {
  const result = {};

  const variables = {
    id: guidanceId,
  };
  try {
    const data = await gqlClient.request(deleteGuidanceQuery, variables);
    if (data) {
      result.success = true;
    }
  } catch (e) {
    result.error = e.message;
    console.error(e);
  }
  return result;
}

export default deleteGuidance;
