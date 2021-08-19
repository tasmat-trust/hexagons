import useStateOnce from "../data-fetching/useStateOnce";
import handleNonResponses from "../data-fetching/handleNonResponses";
import { getCoreSubjects } from "../../queries/Subjects"

export default function WithCoreSubjects(WrappedComponent) {
  function WithCoreSubjects(props) {
    const [subjectsData, error] = useStateOnce([getCoreSubjects])
    const gotNonResponse = handleNonResponses(subjectsData, error)
    if (gotNonResponse) return gotNonResponse
    return (
      <>
        {subjectsData.subjects && <WrappedComponent coreSubjects={subjectsData.subjects} {...props} />}
      </>
    )
  }

  return WithCoreSubjects
}