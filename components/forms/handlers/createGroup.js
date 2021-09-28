import { createGroupQuery } from '../../../queries/Groups'


async function createGroup({ formData, gqlClient, orgId, triggerSharedState }) {

  const result = {}

  const variables = {
    name: formData.name,
    orgId: orgId
  }
  try {
    const data = await gqlClient.request(createGroupQuery, variables)
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

export default createGroup