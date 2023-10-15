import { createCapabilityQuery } from '../../../queries/Subjects';
import { flattenDataAttributes } from '../../data-fetching/useSWRWrapped';
import { HandlerArgs, ResponseObject } from '../types';

type QueryVars = {
  text: string;
  module: number;
  order: number;
};

async function createGuidance({ formData, gqlClient, moduleId }: HandlerArgs) {
  const result = <ResponseObject>{};

  const variables = <QueryVars>{
    text: formData.text,
    module: moduleId,
    order: 1,
  };
  try {
    const lumpyData = await gqlClient.request(createCapabilityQuery, variables);
    const data = flattenDataAttributes(lumpyData);
    if (data) {
      result.success = true;
    }
  } catch (e) {
    result.error = e.message;
    console.error(e);
  }
  return result;
}

export default createGuidance;
