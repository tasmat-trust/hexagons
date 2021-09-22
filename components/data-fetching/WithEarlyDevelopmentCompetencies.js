import PropTypes from 'prop-types'
import { getCompetencies } from '../../queries/Pupils'
import useSWR from 'swr'

export default function WithEarlyDevelopmentCompetencies(WrappedComponent) {
  function WithEarlyDevelopmentCompetencies({ edCompetenciesVars, initialCompetencies, ...other }) {
    const { data: edCompetenciesData } = useSWR([getCompetencies, edCompetenciesVars], { suspense: true })
    let competencies = edCompetenciesData.competencies
    // detect duplicates
    if (competencies.length > 0) {
      const fks = competencies.map((comp) => comp.capability_fk)
      const unique = Array.from(new Set(fks))
      if (fks.length !== unique.length) {
        throw new Error('Got duplicate competencies')
      }
    }
    const mergedCompetencies = [...competencies, ...initialCompetencies]
    return <WrappedComponent
      initialCompetencies={mergedCompetencies}
      {...other} />
  }


  WithEarlyDevelopmentCompetencies.propTypes = {
    competenciesVars: PropTypes.object
  }

  return WithEarlyDevelopmentCompetencies
}
