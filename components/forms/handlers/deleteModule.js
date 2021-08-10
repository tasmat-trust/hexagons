import { deleteCapabilityQuery, deleteModuleQuery } from '../../../queries/Subjects'

async function deleteCapabilities(gqlClient, module) {

  async function deleteCapability(variables) {
    try {
      const data = await gqlClient.request(deleteCapabilityQuery, variables)
      if (data) {
        return true
      }
    } catch (e) {
      console.error(e)
      return false
    }
  }
  await module.capabilities.map(async (capability, i) => await deleteCapability({ id: capability.id }))
  return true
}

async function deleteStage(gqlClient, module) {

  async function deleteStage(variables) {
    try {
      const data = await gqlClient.request(deleteModuleQuery, variables)
      if (data) {
        return true
      }
    } catch (e) {
      console.error(e)
      return false
    }
  }
  await deleteStage({ id: module.id })
  return true
}

export default async function deleteModule(gqlClient, module, triggerSharedState) {
  await deleteCapabilities(gqlClient, module)
  await deleteStage(gqlClient, module)
  if (triggerSharedState) triggerSharedState()
}




