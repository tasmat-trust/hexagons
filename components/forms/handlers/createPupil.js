import { createPupilQuery } from '../../../queries/Pupils'


async function createPupil(formData, gqlClient, orgId, triggerSharedState) {

  const variables = {
    name: formData.name,
    orgId: orgId,
    groupId: formData.groups
  }
  try {
    const data = await gqlClient.request(createPupilQuery, variables)
    if (data) {
      triggerSharedState.update()
    }
  } catch (e) {
    console.error(e)
  }
}

export default createPupil