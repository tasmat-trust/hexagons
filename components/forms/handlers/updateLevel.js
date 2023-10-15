import { updateLevelQuery } from '../../../queries/Pupils';
import { flattenDataAttributes } from '../../data-fetching/useSWRWrapped';

async function updateLevel(gqlClient, variables, triggerSharedState, setError) {
  try {
    const lumpyData = await gqlClient.request(updateLevelQuery, variables);
    const data = flattenDataAttributes(lumpyData);
    if (data) {
      return data.updateLevel.level;
    }
  } catch (e) {
    //setError(e)
    console.error(e);
  }
}

export default updateLevel;
