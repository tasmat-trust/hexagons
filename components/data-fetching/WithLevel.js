import PropTypes from 'prop-types'
import { Suspense } from 'react'
import useSWR from 'swr'
import { getLevel } from "../../queries/Pupils"

export default function WithLevel(WrappedComponent) {
  function WithLevel({ getLevelVars, ...other }) {
    const { data: visibleLevelData } = useSWR([getLevel, getLevelVars]) 
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

