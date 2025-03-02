import calculateCompetenciesForThisLevel from './calculateCompetenciesForThisLevel';
import { getPercentComplete, getPercentFromStatus } from './getPercentComplete';
import { sortLevels } from './sortLevelsAndModules';
export default function getCurrentLevel(jumbledLevels) {
  let level
  const levels = sortLevels(jumbledLevels);
  // Get highest level with activity
  const activeLevels = levels.filter((level) => level.status);
  const passedLevel = activeLevels[activeLevels.length - 1]; // get last item


  if (!passedLevel?.module || !passedLevel?.status) return
  if (passedLevel.percentComplete > -1) {
    level = passedLevel
    console.log('Using server level and value')
  } else {
    const browserLevel = structuredClone(passedLevel)
    console.log('Using computed level and value:', browserLevel)
    if (browserLevel.wasQuickAssessed === true) {
      browserLevel['percentComplete'] = getPercentFromStatus(browserLevel.status);
    } else {
      const competencies = calculateCompetenciesForThisLevel(browserLevel.competencies, browserLevel.module.capabilities)
      browserLevel['percentComplete'] = getPercentComplete(competencies, browserLevel.module.capabilities);
    }
    level = browserLevel
  }

  return level;
}
