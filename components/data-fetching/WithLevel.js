import useStateOnce from "../data-fetching/useStateOnce"
import { getLevel } from "../../queries/Pupils"

export default function WithLevel(WrappedComponent) {
  return function WithLevel(props) {
    const [visibleLevelData] = useStateOnce([getLevel, props.getLevelVars])
    return (
      <WrappedComponent initialVisibleLevel={visibleLevelData}  {...props} />
    )
  }
}