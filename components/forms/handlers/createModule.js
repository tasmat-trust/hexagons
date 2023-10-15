import { createModuleQuery, createCapabilityQuery } from '../../../queries/Subjects';

async function createCapability(formData, gqlClient, triggerSharedState) {
  async function createModule(createModuleVariables) {
    try {
      const data = await gqlClient.request(createModuleQuery, createModuleVariables);
      if (data) {
        if (triggerSharedState) triggerSharedState();
        return data.createModule.data.id; // Return module ID for capabilities
      }
    } catch (e) {
      console.error(e);
      return 'errors';
    }
  }

  async function createCapability(capability, i, moduleId) {
    const createCapabilityVariables = {
      text: capability,
      order: i,
      module: moduleId,
    };

    try {
      const data = await gqlClient.request(createCapabilityQuery, createCapabilityVariables);
      if (data) {
        return 'success';
      }
    } catch (e) {
      console.error(e);
      return 'errors';
    }
  }

  let moduleId;
  if (formData.order && formData.level) {
    const createModuleVariables = {
      subject: parseInt(formData.subjectId),
      order: parseInt(formData.order),
      level: formData.level,
      summary: formData.summary,
    };
    moduleId = await createModule(createModuleVariables);
  }
  const capabilitiesList = formData.capabilities.split('\n');
  const createdCapabilities = capabilitiesList.map(
    async (capability, i) => await createCapability(capability, i, moduleId)
  );
  await Promise.all(createdCapabilities);
  triggerSharedState();
}

export default createCapability;
