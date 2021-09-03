function sortModules(modules) {
  modules.sort((a, b) => a.order > b.order)
  modules.sort((a, b) => {
    const aLevel = a.level === 'step' ? 1 : 0
    const bLevel = b.level === 'step' ? 1 : 0
    return (
      aLevel < bLevel
    )
  })
  return modules
}

function sortLevels(levels) {
  levels.sort((a, b) => a.module.order > b.module.order)
  levels.sort((a, b) => {
    const aLevel = a.module.level === 'step' ? 1 : 0
    const bLevel = b.module.level === 'step' ? 1 : 0
    return (
      aLevel < bLevel
    )
  })
  return levels
}

export {
  sortModules,
  sortLevels
}