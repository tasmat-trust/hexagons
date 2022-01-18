function sortModules(modules) {
  modules.sort((a, b) => a.order - b.order)
  modules.sort((a, b) => {
    const aLevel = a.level === 'step' ? 'a' : 'b'
    const bLevel = b.level === 'step' ? 'a' : 'b'
    return aLevel.localeCompare(bLevel)
  })
  return modules
}

function sortLevels(levels) {
  levels.sort((a, b) => a.module.order - b.module.order)
  levels.sort((a, b) => {
    const aLevel = a.module.level === 'step' ? 'a' : 'b'
    const bLevel = b.module.level === 'step' ? 'a' : 'b'
    return aLevel.localeCompare(bLevel)
  })
  return levels
}

export {
  sortModules,
  sortLevels
}