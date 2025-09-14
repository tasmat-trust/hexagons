import { createPupilQuery } from '../../../queries/Pupils'


async function createPupil({ formData, gqlClient, orgId, triggerSharedState }) {

  const result = {}

  const variables = {
    name: formData.name,
    orgId: orgId,
    groupId: formData.groups,
    targetLevel: formData.targetLevel || 'medium' // default to medium
  }
  try {
    const data = await gqlClient.request(createPupilQuery, variables)
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

export default createPupil
