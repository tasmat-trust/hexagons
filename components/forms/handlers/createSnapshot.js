import { createSnapshotQuery } from '../../../queries/Targets'


async function createSnapshot({ formData, gqlClient, orgId, triggerSharedState }) {

  const result = {}

  const variables = {
    name: formData.name,
    orgId: orgId
  }
  try {
    const data = await gqlClient.request(createSnapshotQuery, variables)
    if (data) {
      result.success = true
      triggerSharedState.update()
    }
  } catch (e) {
    result.error = e.message
    console.error(e)
  }
  return result
}

export default createSnapshot