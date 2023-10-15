import { createGuidanceQuery } from '../../../queries/Subjects';
import { flattenDataAttributes } from '../../data-fetching/useSWRWrapped';

async function createGuidance({ formData, gqlClient, capabilityId, userId }) {
  const result = {};

  const variables = {
    text: formData.textarea,
    capability: capabilityId,
    userId: userId,
  };
  try {
    const lumpyData = await gqlClient.request(createGuidanceQuery, variables);
    const data = flattenDataAttributes(lumpyData);
    if (data) {
      result.success = true;
      result.guidance = data;
    }
  } catch (e) {
    result.error = e.message;
    console.error(e);
  }
  return result;
}

export default createGuidance;
