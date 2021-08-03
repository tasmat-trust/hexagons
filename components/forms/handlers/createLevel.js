import { createLevelQuery } from '../../../queries/Pupils'

async function createLevel(gqlClient, variables, triggerSharedState, setError) {
  try {
    const data = await gqlClient.request(createLevelQuery, variables)
    if (data) {
      return data.createLevel.level
      //triggerSharedState.update()
    }
  } catch (e) {
    //setError(e)
    console.error(e)
  }
}

export default createLevel