import { useEffect } from "react"
import useSharedState from "../data-fetching/useSharedState"
import handleNonResponses from "../data-fetching/handleNonResponses"
import { getModule, getSingleSubjectBySlug } from '../../queries/Subjects'
import StagePicker from "../subjects/StagePicker"
import Capabilities from "../subjects/Capabilities"
import { useState } from "react"

function SubjectGetter(WrappedComponent) {
  return function SubjectGetter(props) {
    const { session, variables, setSubjectName } = props
    const [subjectData, setSubjectData, error] = useSharedState([getSingleSubjectBySlug, variables])
    const gotNonResponse = handleNonResponses(subjectData)


    useEffect(() => {
      if (subjectData) {
        setSubjectName && setSubjectName(subjectData.subjects[0].name)
      }
    }, [setSubjectName, subjectData])


    if (gotNonResponse) return gotNonResponse
    const subjectId = subjectData.subjects[0].id
    return (
      <WrappedComponent {...props} variables={{ level: session.school_type, subjectId: subjectId }} />
    )
  }
}


function ManageCapabilities(props) {
  const { variables } = props
  const [modulesData, setModulesData, error] = useSharedState([getModule, variables])
  const gotNonResponse = handleNonResponses(modulesData)  
  const [currentStage, setCurrentStage] = useState(null)
  if (gotNonResponse) return gotNonResponse
  return (
    <>
      <StagePicker {...props} stages={modulesData.modules} setCurrentStage={setCurrentStage} />
      <Capabilities currentStage={currentStage} />
    </>
  )

}

export default SubjectGetter(ManageCapabilities)