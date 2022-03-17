function getPercentComplete(competencies, capabilities) {
  if (!competencies || !capabilities) return 0;
  const completeCompetencies = competencies.filter((comp, i) => comp.status === 'complete');
  return parseInt((completeCompetencies.length / capabilities.length) * 100);
}

function getPercentFromStatus(status) {
  return status === 'emerging' ? 25 : status === 'developing' ? 60 : status === 'secure' ? 75 : 100;
}

export { getPercentComplete, getPercentFromStatus };
