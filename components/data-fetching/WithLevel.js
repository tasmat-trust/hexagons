import useStateOnce from "../data-fetching/useStateOnce"
import { getLevel } from "../../queries/Pupils"

export default function WithLevel(WrappedComponent) {
  return function WithLevel(props) {
    const [visibleLevelData] = useStateOnce([getLevel, props.getLevelVars])
    const gotResponse = visibleLevelData && visibleLevelData.levels ? true : false
    console.log(gotResponse)
    return (
      <WrappedComponent initialVisibleLevel={visibleLevelData} gotResponse={gotResponse}  {...props} />
    )
  }
}

 