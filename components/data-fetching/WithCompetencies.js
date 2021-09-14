import PropTypes from 'prop-types'
import { getCompetencies } from '../../queries/Pupils'
import useSWR from 'swr'

export default function WithCompetencies(WrappedComponent) {
  function WithCompetencies({ competenciesVars, isAdmin, ...other }) {
    const { data: competenciesData} = useSWR([getCompetencies, competenciesVars], { suspense: true })
    let competencies = competenciesData.competencies

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
        {!isAdmin && <WrappedComponent
          isAdmin={isAdmin}
          initialCompetencies={competencies}
          {...other} />}
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
