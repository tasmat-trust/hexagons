import PropTypes from 'prop-types'
import { getCompetencies } from '../../queries/Pupils'
import useSWR from 'swr'

export default function WithCompetencies(WrappedComponent) {
  function WithCompetencies({ competenciesVars, ...other }) {
    const { data: competenciesData } = useSWR([getCompetencies, competenciesVars])
    let competencies = competenciesData ? competenciesData.competencies : null
    // detect duplicates
    if (competencies && competencies.length > 0) {
      const fks = competencies.map((comp) => comp.capability_fk)
      const unique = Array.from(new Set(fks))
      if (fks.length !== unique.length) {
        throw new Error('Got duplicate competencies')
      }
    }
    return competencies ? <WrappedComponent
      initialCompetencies={competencies}
      {...other} /> : <WrappedComponent {...other} />
  }

  WithCompetencies.propTypes = {
    competenciesVars: PropTypes.object
  }

  return WithCompetencies
}
