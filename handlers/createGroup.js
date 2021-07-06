import { createGroupQuery } from '../queries/Groups'


async function createGroup(formData, gqlClient, orgId, setSharedState) {

  const variables = {
    name: formData.name,
    orgId: orgId
  }
  try {
    const data = await gqlClient.request(createGroupQuery, variables)
    if (data) {
      setSharedState.update()
    }
  } catch (e) {
    console.error(e)
  }
}

export default createGroup