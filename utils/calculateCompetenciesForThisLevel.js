function calculateCompetenciesForThisLevel(allComps, capabilitiesToMatch) {
  if (allComps && allComps.length > 0 && capabilitiesToMatch) {
    const capString = JSON.stringify(capabilitiesToMatch);
    const competencies = allComps.filter((comp, i) => capString.includes(comp.capability_fk));
    return competencies;
  }
  return null;
}

export default calculateCompetenciesForThisLevel;
