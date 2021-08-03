import { updateLevelQuery } from '../../../queries/Pupils'

async function updateLevel(gqlClient, variables, triggerSharedState, setError) {
  try {
    const data = await gqlClient.request(updateLevelQuery, variables)
    if (data) {
       return data.updateLevel.level
    }
  } catch (e) {
    //setError(e)
    console.error(e)
  }
}

export default updateLevel