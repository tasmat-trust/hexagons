function sortModuleBy(items, level) {
  return  items.sort((a, b) => {
    const aLevel = a.level === level ? 'a' : 'b'
    const bLevel = b.level === level ? 'a' : 'b'
    return aLevel.localeCompare(bLevel)
  })
}

function sortModules(modules) {
  let sortedModules = modules
  sortedModules = sortedModules.sort((a, b) => a.order - b.order)
  sortedModules = sortModuleBy(sortedModules, 'phase')
  sortedModules = sortModuleBy(sortedModules, 'band')
  sortedModules = sortModuleBy(sortedModules, 'stage')
  sortedModules = sortModuleBy(sortedModules, 'step')
  return sortedModules
}

function sortLevelBy(items, level) {
  return  items.sort((a, b) => {
    const aLevel = a.module.level === level ? 'a' : 'b'
    const bLevel = b.module.level === level ? 'a' : 'b'
    return aLevel.localeCompare(bLevel)
  })
}

function sortLevels(levels) {
  let sortedLevels = levels
  sortedLevels = sortedLevels.sort((a, b) => a.module.order - b.module.order)
  sortedLevels = sortLevelBy(sortedLevels, 'phase')
  sortedLevels = sortLevelBy(sortedLevels, 'band')
  sortedLevels = sortLevelBy(sortedLevels, 'stage')
  sortedLevels = sortLevelBy(sortedLevels, 'step')
  return sortedLevels
}

export {
  sortModules,
  sortLevels
}