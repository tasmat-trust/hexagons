import StagesTabs from './StagesTabs'
import WithCompetencies from '../data-fetching/WithCompetencies'
import WithModules from '../data-fetching/WithModules'

export default WithModules(WithCompetencies(StagesTabs))