function sortBy(modules, level) {
  return  modules.sort((a, b) => {
    const aLevel = a.level === level ? 'a' : 'b'
    const bLevel = b.level === level ? 'a' : 'b'
    return aLevel.localeCompare(bLevel)
  })
}

function sortModules(modules) {
  modules.sort((a, b) => a.order - b.order)
  sortBy(modules, 'phase')
  sortBy(modules, 'band')
  sortBy(modules, 'stage')
  sortBy(modules, 'step')
  return modules
}

function sortLevels(levels) {
  levels.sort((a, b) => a.module.order - b.module.order)
  sortBy(levels, 'phase')
  sortBy(levels, 'band')
  sortBy(levels, 'stage')
  sortBy(levels, 'step')
  return levels
}

export {
  sortModules,
  sortLevels
}