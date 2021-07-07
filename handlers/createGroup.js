import { createGroupQuery } from '../queries/Groups'


async function createGroup(formData, gqlClient, orgId, triggerSharedState) {

  const variables = {
    name: formData.name,
    orgId: orgId
  }
  try {
    const data = await gqlClient.request(createGroupQuery, variables)
    if (data) {
      triggerSharedState.update()
    }
  } catch (e) {
    console.error(e)
  }
}

export default createGroup