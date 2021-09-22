import PropTypes from 'prop-types'
import { Suspense, useContext } from 'react'
import useSWR from 'swr'
import { getLevel, deleteLevel } from "../../queries/Pupils"
import { HexagonsContext } from './HexagonsContext'

export default function WithLevel(WrappedComponent) {
  function WithLevel({ getLevelVars, ...other }) {
    const { gqlClient } = useContext(HexagonsContext)
    const { data: visibleLevelData } = useSWR([getLevel, getLevelVars])
    let correctLevel = visibleLevelData ? visibleLevelData.levels[0] : null
    if (visibleLevelData && visibleLevelData.levels.length > 1) {
      // Got duplicates - get all competencies out of levels 
      // combine them into the first item
      // then delete all but the first
      // N.B. In production there shouldn't be duplicates due to defensive coding elsewhere
      // So the below is just in case!
      const competencies = []
      visibleLevelData.levels.map((level, i) => {
        competencies.push(...level.competencies)
      })
      correctLevel.competencies = [...new Set([...competencies])];
      const levelNoCompetencies = visibleLevelData.levels.filter((level, i) => {
        return i !== 0
      })
      levelNoCompetencies.map(async (level, i) => {
        // safely delete levels
        try {
          await gqlClient.request(deleteLevel, { id: level.id })
        } catch (e) {
          console.error(e)
        }
      })
    }
    return (
      <>
        {!correctLevel && <WrappedComponent {...other} />}
        {correctLevel && <WrappedComponent initialVisibleLevel={correctLevel} {...other} />}
      </>
    )
  }

  WithLevel.propTypes = {
    getLevelVars: PropTypes.object
  }

  return WithLevel
}

