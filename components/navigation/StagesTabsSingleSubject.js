import StagesTabs from './StagesTabs'
import WithCompetencies from '../data-fetching/WithCompetencies'
import WithModules from '../data-fetching/WithModules'
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug'

export default WithSingleSubjectFromSlug(WithModules(WithCompetencies(StagesTabs)))