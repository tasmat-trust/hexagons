import PropTypes from 'prop-types'
import { Suspense, useContext } from 'react'
import useSWR from 'swr'
import { getLevel, deleteLevel } from "../../queries/Pupils"
import { HexagonsContext } from './HexagonsContext'

export default function WithLevel(WrappedComponent) {
  function WithLevel({ getLevelVars, ...other }) {
    const { gqlClient } = useContext(HexagonsContext)
    const { data: visibleLevelData } = useSWR([getLevel, getLevelVars])
    if (visibleLevelData && visibleLevelData.levels.length > 1) {
      const levelNoCompetencies = visibleLevelData.levels.filter((level) => {
        return level.competencies.length === 0
      })
      levelNoCompetencies.map(async (level, i) => {
        // safely delete level
        try {
          await gqlClient.request(deleteLevel, { id: level.id })
        } catch (e) {
          console.error(e)
        }
      })
    }
    return (
      <>
        {!visibleLevelData && <WrappedComponent {...other} />}
        {visibleLevelData && <WrappedComponent initialVisibleLevel={visibleLevelData} {...other} />}
      </>
    )
  }

  WithLevel.propTypes = {
    getLevelVars: PropTypes.object
  }

  return WithLevel
}

