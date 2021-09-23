import StagesTabs from './StagesTabs'
import WithModules from '../data-fetching/WithModules'
import WithEarlyDevelopmentModule from '../data-fetching/WithEarlyDevelopmentModule'
import WithEarlyDevelopmentFromSlug from '../data-fetching/WithEarlyDevelopmentFromSlug'
export default WithEarlyDevelopmentFromSlug(WithModules(WithEarlyDevelopmentModule(StagesTabs)))