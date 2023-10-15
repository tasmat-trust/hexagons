import { updateSummaryTextQuery } from '../../../queries/Subjects';
import { flattenDataAttributes } from '../../data-fetching/useSWRWrapped';

async function updateCapabilityText({ gqlClient, moduleId, formData }) {
  const result = {};

  try {
    const variables = {
      module: moduleId,
      summary: formData.textarea,
    };
    const lumpyData = await gqlClient.request(updateSummaryTextQuery, variables);
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
