import calculateCompetenciesForThisLevel from './calculateCompetenciesForThisLevel';
import { getPercentComplete, getPercentFromStatus } from './getPercentComplete';
import { sortLevels } from './sortLevelsAndModules';
export default function getCurrentLevel(jumbledLevels) {
  const levels = sortLevels(jumbledLevels);
  // Get highest level with activity
  const activeLevels = levels.filter((level) => level.status);
  const level = activeLevels[activeLevels.length - 1]; // get last item

  if (level && level.wasQuickAssessed === true && level.status && level.module) {
    level['percentComplete'] = getPercentFromStatus(level.status);
  }

  if (level && level.status && !level.wasQuickAssessed && level.module) {
    const competencies = calculateCompetenciesForThisLevel(level.competencies, level.module.capabilities)
    level['percentComplete'] = getPercentComplete(competencies, level.module.capabilities);
  }

  return level;
}
