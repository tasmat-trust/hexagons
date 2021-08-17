import useStateOnce from '../data-fetching/useStateOnce';
import { getPupilsByGroup } from '../../queries/Pupils';
import handleNonResponses from '../data-fetching/handleNonResponses';

export default function WithPupilsByGroup(WrappedComponent) {
  return function WithPupilsByGroup(props) {
    const { pupilsByGroupVariables } = props
    const [pupilsData, error] = useStateOnce([getPupilsByGroup, pupilsByGroupVariables])
    const gotNonResponse = handleNonResponses(pupilsData, error)
    if (gotNonResponse) return gotNonResponse
    return (
      <>
        {pupilsData.pupils && <WrappedComponent pupils={pupilsData.pupils} {...props} />}
      </>
    )
  }
}