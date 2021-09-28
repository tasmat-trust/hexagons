import { createTeacherQuery } from '../../../queries/Teachers'

async function createTeacher({ formData, gqlClient, orgId }) {

  const result = {}

  const variables = {
    role: "1",
    username: formData.username,
    email: formData.email,
    orgId: orgId,
    password: 'someverylongandsecurepassword',
    groupId: formData.groups,
    confirmed: true
  }
  try {
    const data = await gqlClient.request(createTeacherQuery, variables)
    if (data) {
      result.success = true
    }
  } catch (e) {
    resut.error = e.message
    console.error(e)
  }

  return result
}

export default createTeacher