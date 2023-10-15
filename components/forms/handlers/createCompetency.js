import {
  createCompetencyQuery,
  getCompetencies,
  getCompetency,
  updateCompetencyQuery,
} from '../../../queries/Pupils';
import { flattenDataAttributes } from '../../data-fetching/useSWRWrapped';

async function updateCompetencies(gqlClient, variables, setCompetencies) {
  try {
    const data = await gqlClient.request(getCompetencies, variables);
    const flattenedData = flattenDataAttributes(data);
    if (flattenedData) {
      setCompetencies(flattenedData.competencies);
      return true;
    }
  } catch (e) {
    //setError(e)
    console.error(e);
    return false;
  }
}

async function createCompetency(
  gqlClient,
  variables,
  checkCompetencyVars,
  refreshCompetencyVars,
  updateCompetencyVars,
  setCompetencies,
  setError
) {
  let existingCompetencyId = null;
  try {
    const data = await gqlClient.request(getCompetency, checkCompetencyVars);

    if (data) {
      const flattenedData = flattenDataAttributes(data);
      if (flattenedData.competencies) {
        if (flattenedData.competencies[0]) {
          existingCompetencyId = flattenedData.competencies[0].id;
        }
      }
    }
  } catch (e) {
    console.error(e);
    return false;
  }
  if (existingCompetencyId) {
    try {
      const variables = updateCompetencyVars;
      variables.id = existingCompetencyId;
      const data = await gqlClient.request(updateCompetencyQuery, variables);
      const flattenedData = flattenDataAttributes(data);

      if (flattenedData) {
        const finished = updateCompetencies(gqlClient, refreshCompetencyVars, setCompetencies);
        return finished;
      }
    } catch (e) {
      //setError(e)
      console.error(e);
      return false;
    }
  } else {
    try {
      const data = await gqlClient.request(createCompetencyQuery, variables);
      const flattenedData = flattenDataAttributes(data);
      if (flattenedData) {
        const finished = updateCompetencies(gqlClient, refreshCompetencyVars, setCompetencies);
        return finished;
      }
    } catch (e) {
      //setError(e)
      console.error(e);
      return false;
    }
  }
}

export default createCompetency;
