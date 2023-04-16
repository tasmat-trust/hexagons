import { deleteCompetency } from "./deleteCompetency"

async function deleteCompetencies(gqlClient, competencies) {
    await competencies.map(async (competency, i) => await deleteCompetency(gqlClient, { id: competency.id }))
    return true
  }

export { deleteCompetencies }