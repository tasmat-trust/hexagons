import PropTypes from 'prop-types'
import useStateOnce from './useStateOnce';
import { getCompetencies } from '../../queries/Pupils'

export default function WithCompetencies(WrappedComponent) {
  function WithCompetencies({ competenciesVars, isAdmin, ...other }) {
    const [competenciesData, error] = useStateOnce([getCompetencies, competenciesVars])
    let competencies = []
    if (competenciesData) {
      competencies = competenciesData.competencies
    }
    // detect duplicates
    if (competencies.length > 0) {
      const fks = competencies.map((comp) => comp.capability_fk)
      const unique = Array.from(new Set(fks))
      if (fks.length !== unique.length) {
        throw new Error('Got duplicate competencies')
      }
    }
    return (
      <>
        {!isAdmin && <WrappedComponent isAdmin={isAdmin} competenciesData={competencies} {...other} />}
        {isAdmin && <WrappedComponent isAdmin={isAdmin} {...other} />}
      </>
    )
  }

  WithCompetencies.propTypes = {
    competenciesVars: PropTypes.object,
    isAdmin: PropTypes.bool
  }

  return WithCompetencies
}
