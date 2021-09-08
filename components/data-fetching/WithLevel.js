import PropTypes from 'prop-types'
import { Suspense } from 'react'
import useSWR from 'swr'
import { getLevel } from "../../queries/Pupils"
import Loading from '../ui-globals/Loading'

export default function WithLevel(WrappedComponent) {
  function WithLevel({ getLevelVars, ...other }) {
    const { data: visibleLevelData } = useSWR([getLevel, getLevelVars], { suspense: true })
    return (
      <Suspense fallback={<Loading message="Loading level"/>}>
        <WrappedComponent initialVisibleLevel={visibleLevelData} {...other} />
      </Suspense>
    )
  }

  WithLevel.propTypes = {
    getLevelVars: PropTypes.object
  }

  return WithLevel
}

