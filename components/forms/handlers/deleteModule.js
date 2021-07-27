import { deleteCapabilityQuery, deleteModuleQuery } from '../../../queries/Subjects'

async function deleteCapabilities(gqlClient, module, triggerSharedState) {

  async function deleteCapability(variables) {
    try {
      const data = await gqlClient.request(deleteCapabilityQuery, variables)
      if (data) {
        if (triggerSharedState) triggerSharedState()
        return data
      }
    } catch (e) {
      console.error(e)
      return 'errors'
    }
  }
  await module.capabilities.map(async (capability, i) => await deleteCapability({ id: capability.id }))
  triggerSharedState()
}

async function deleteStage(gqlClient, module, triggerSharedState) {

  async function deleteStage(variables) {
    try {
      const data = await gqlClient.request(deleteModuleQuery, variables)
      if (data) {
        if (triggerSharedState) triggerSharedState()
        return data
      }
    } catch (e) {
      console.error(e)
      return 'errors'
    }
  }

  await deleteStage({id: module.id})

}


export {
  deleteStage,
  deleteCapabilities
}





