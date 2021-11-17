import { updateSummaryTextQuery } from '../../../queries/Subjects'

async function updateCapabilityText({ gqlClient, moduleId, formData }) {

  const result = {}

  try {
    const variables = {
      module: moduleId,
      summary: formData.textarea
    }
    const data = await gqlClient.request(updateSummaryTextQuery, variables)
    if (data) {
      result.success = true
      result.capabilityResponse = data
    }
  } catch (e) {
    result.error = e.message
    console.error(e)
  }
  return result
}

export default updateCapabilityText