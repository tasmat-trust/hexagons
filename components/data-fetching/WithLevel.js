import PropTypes from 'prop-types'
import useStateOnce from "../data-fetching/useStateOnce"
import { getLevel } from "../../queries/Pupils"

export default function WithLevel(WrappedComponent) {
  function WithLevel({ getLevelVars, ...other }) {
    const [visibleLevelData] = useStateOnce([getLevel, getLevelVars])
    return (
      <WrappedComponent initialVisibleLevel={visibleLevelData} {...other} />
    )
  }

  WithLevel.propTypes = {
    getLevelVars: PropTypes.object
  }

  return WithLevel
}

