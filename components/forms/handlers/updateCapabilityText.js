import { updateCapabilityTextQuery } from '../../../queries/Subjects'

async function updateCapabilityText({ gqlClient, capabilityId, formData }) {

  const result = {}

  try {
    const variables = {
      capability: capabilityId,
      text: formData.text
    }
    const data = await gqlClient.request(updateCapabilityTextQuery, variables)
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