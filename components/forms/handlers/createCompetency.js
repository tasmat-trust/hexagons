import { createCompetencyQuery, getCompetencies, getCompetency, updateCompetencyQuery } from '../../../queries/Pupils'

async function updateCompetencies(gqlClient, variables, setCompetencies) {
  try {
    const data = await gqlClient.request(getCompetencies, variables)
    if (data) {
      console.log(data)
      setCompetencies(data.competencies)
    }
  } catch (e) {
    //setError(e)
    console.error(e)
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
  }
  if (existingCompetencyId) {
    try {
      const variables = updateCompetencyVars
      variables.id = existingCompetencyId
      const data = await gqlClient.request(updateCompetencyQuery, variables)
      if (data) {
        console.log(data)
        updateCompetencies(gqlClient, refreshCompetencyVars, setCompetencies)
      }
    } catch (e) {
      //setError(e)
      console.error(e)
    }
  } else {
    try {
      const data = await gqlClient.request(createCompetencyQuery, variables)
      if (data) {
        console.log(data)
        updateCompetencies(gqlClient, refreshCompetencyVars, setCompetencies)
      }
    } catch (e) {
      //setError(e)
      console.error(e)
    }
  }
}

export default createCompetency