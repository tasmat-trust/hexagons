
export default function getPercentComplete(competencies, capabilities) {
  if (!competencies || !capabilities) return false
  const completeCompetencies = competencies.filter((comp,i) => comp.status === 'complete') 
  return parseInt((completeCompetencies.length / capabilities.length) * 100)
}