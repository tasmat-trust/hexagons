import { createModuleQuery, createCapabilityQuery } from '../queries/Subjects'

async function createCapability(formData, gqlClient, triggerSharedState) {

  async function createModule(createModuleVariables) {
    try {
      const data = await gqlClient.request(createModuleQuery, createModuleVariables)
      if (data) {
        triggerSharedState()
        return 'success'
      }
    } catch (e) {
      console.error(e)
      return 'errors'
    }
  }

  async function createCapability(capability,i) {


    const createCapabilityVariables = {
      text: capability,
      order: i,
      module: 19
    }

    try {
      const data = await gqlClient.request(createCapabilityQuery, createCapabilityVariables)
      if (data) {
        return 'success'
      }
    } catch (e) {
      console.error(e)
      return 'errors'
    }
  }

  if (formData.order && formData.level) {
    const createModuleVariables = {
      subject: formData.subjectId,
      order: parseInt(formData.order),
      level: formData.level
    }
    const createModuleResponse = await createModule(createModuleVariables)
    console.log(createModuleResponse)
  }

  const capabilitiesList = formData.capabilities.split('\n')
  const createdCapabilities = capabilitiesList.map(async (capability, i) => await createCapability(capability,i))
  const resolvedCapabilities = await Promise.all(createdCapabilities)
}



export default createCapability