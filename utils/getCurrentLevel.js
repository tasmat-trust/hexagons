import getPercentComplete from "./getPercentComplete";
import { sortLevels } from "./sortLevelsAndModules";
export default function getCurrentLevel(jumbledLevels) {

  const levels = sortLevels(jumbledLevels)
 
  // Find current level:

  const incompleteLevels = levels.filter((level) => level.status !== 'complete');
  let level = null;
  if (incompleteLevels.length === 0) {
    // Get latest complete level 
    let completeLevels = levels.filter((level) => level.status === 'complete');

    if (completeLevels.length > 0) {
      let latestLevelIndex = completeLevels.length - 1;
      level = completeLevels[latestLevelIndex]
    }
  } else if (incompleteLevels.length > 1) {
    // Got more than one incomplete level, get later
    level = incompleteLevels[0] // choose earliest for now (possible duplicates)
  } else {
    // Choose the incomplete level
    level = incompleteLevels[0]
  }

  // Calculate level percent complete
  if (level && level.status && level.status === 'incomplete' && level.module) {
    level['percentComplete'] = getPercentComplete(level.competencies, level.module.capabilities)
  }

  if (level && level.status && level.status === 'complete' && level.module) {
    level['percentComplete'] = 100
  }

  return level

}