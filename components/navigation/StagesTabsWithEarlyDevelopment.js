import StagesTabs from './StagesTabs'
import WithCompetencies from '../data-fetching/WithCompetencies'
import WithModules from '../data-fetching/WithModules'
import WithEarlyDevelopmentModule from '../data-fetching/WithEarlyDevelopmentModule'
import WithEarlyDevelopmentFromSlug from '../data-fetching/WithEarlyDevelopmentFromSlug'
import WithEarlyDevelopmentCompetencies from '../data-fetching/WithEarlyDevelopmentCompetencies'

export default WithEarlyDevelopmentFromSlug(WithModules(WithEarlyDevelopmentModule(WithCompetencies(WithEarlyDevelopmentCompetencies(StagesTabs)))))