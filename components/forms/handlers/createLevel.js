import { createLevelQuery } from '../../../queries/Pupils';
import { flattenDataAttributes } from '../../data-fetching/useSWRWrapped';

async function createLevel(gqlClient, variables, triggerSharedState, setError) {
  try {
    const data = await gqlClient.request(createLevelQuery, variables);
    const flattenedData = flattenDataAttributes(data);

    if (flattenedData) {
      return flattenedData.createLevel;
      //triggerSharedState.update()
    }
  } catch (e) {
    //setError(e)
    console.error(e);
  }
}

export default createLevel;
