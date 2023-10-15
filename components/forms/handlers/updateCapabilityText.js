import { updateCapabilityTextQuery } from '../../../queries/Subjects';
import { flattenDataAttributes } from '../../data-fetching/useSWRWrapped';

async function updateCapabilityText({ gqlClient, capabilityId, formData }) {
  const result = {};

  try {
    const variables = {
      capability: capabilityId,
      text: formData.text,
    };
    const lumpyData = await gqlClient.request(updateCapabilityTextQuery, variables);
    const data = flattenDataAttributes(lumpyData);
    if (data) {
      result.success = true;
      result.capabilityResponse = data;
    }
  } catch (e) {
    result.error = e.message;
    console.error(e);
  }
  return result;
}

export default updateCapabilityText;
