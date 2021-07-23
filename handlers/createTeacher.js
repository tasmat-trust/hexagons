import { createTeacherQuery } from '../queries/Teachers'

async function createTeacher(formData, gqlClient, orgId, triggerSharedState, setError) {
  const variables = {
    role: "1",
    username: formData.username,
    email: formData.email,
    orgId: orgId,
    groupId: formData.groups
  }
  try {
    const data = await gqlClient.request(createTeacherQuery, variables)
    if (data) {
      console.log(data)
      //triggerSharedState.update()
    }
  } catch (e) {
    //setError(e)
    console.error(e)
  }
}

export default createTeacher