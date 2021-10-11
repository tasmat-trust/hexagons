import PropTypes from 'prop-types'
import { getLevel } from '../../queries/Pupils'
import useSWR from 'swr';

export default function WithEarlyDevelopmentLevel(WrappedComponent) {
  function WithEarlyDevelopmentLevel({ getEdLevelVariables, ...other }) {
    const { data: edLevelData } = useSWR([getLevel, getEdLevelVariables], { suspense: true })
    let edLevel = edLevelData.levels.length > 0 ? edLevelData.levels[0] : { status: 'incomplete' }
    return <WrappedComponent
      edLevel={edLevel}
      {...other} />
  }

  WithEarlyDevelopmentLevel.propTypes = {
    getEdLevelVariables: PropTypes.object
  }
  return WithEarlyDevelopmentLevel
}
