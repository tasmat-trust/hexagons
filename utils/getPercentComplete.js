function getPercentComplete(competencies, capabilities) {
  if (!competencies || !capabilities) return false;
  const completeCompetencies = competencies.filter((comp, i) => comp.status === 'complete');
  return parseInt((completeCompetencies.length / capabilities.length) * 100);
}

function getPercentFromStatus(status) {
  return status === 'emerging' ? 25 : status === 'developing' ? 50 : status === 'secure' ? 75 : 100;
}

export { getPercentComplete, getPercentFromStatus };
