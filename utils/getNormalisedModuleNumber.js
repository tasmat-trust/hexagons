export default function getNormalisedModuleNumber(level) {
  // turn from 1-6,1-6 to 1-12
  return level.module.level === 'stage' ? level.module.order + 6 : level.module.order;
}
