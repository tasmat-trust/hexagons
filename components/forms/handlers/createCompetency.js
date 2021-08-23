import { createCompetencyQuery, getCompetencies, getCompetency, updateCompetencyQuery } from '../../../queries/Pupils'

async function updateCompetencies(gqlClient, variables, setCompetencies) {
  try {
    const data = await gqlClient.request(getCompetencies, variables)
    if (data) {
      setCompetencies(data.competencies)
      return true
    }
  } catch (e) {
    //setError(e)
    console.error(e)
    return false
  }
}

async function createCompetency(gqlClient, variables, checkCompetencyVars, refreshCompetencyVars, updateCompetencyVars, setCompetencies, setError) {
  let existingCompetencyId = null;
  try {
    const data = await gqlClient.request(getCompetency, checkCompetencyVars)
    if (data) {
      if (data.competencies) {
        if (data.competencies[0]) {
          existingCompetencyId = data.competencies[0].id
        }
      }
    }
  } catch (e) {
    console.error(e)
    return false
  }
  if (existingCompetencyId) {
    try {
      const variables = updateCompetencyVars
      variables.id = existingCompetencyId
      const data = await gqlClient.request(updateCompetencyQuery, variables)
      if (data) {
        const finished = updateCompetencies(gqlClient, refreshCompetencyVars, setCompetencies)
        return finished
      }
    } catch (e) {
      //setError(e)
      console.error(e)
      return false
    }
  } else {
    try {
      const data = await gqlClient.request(createCompetencyQuery, variables)
      if (data) {
        const finished = updateCompetencies(gqlClient, refreshCompetencyVars, setCompetencies)
        return finished
      }
    } catch (e) {
      //setError(e)
      console.error(e)
      return false
    }
  }
}

export default createCompetency