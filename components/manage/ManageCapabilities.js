import { useEffect } from "react"
import useSharedState from "../data-fetching/useSharedState"
import handleNonResponses from "../data-fetching/handleNonResponses"
import { getModules, getSingleSubjectBySlug } from '../../queries/Subjects'
import StagePicker from "../subjects/StagePicker"
import Capabilities from "../subjects/Capabilities"
import { useState } from "react"

function SubjectGetter(WrappedComponent) {
  return function SubjectGetter(props) {
    const { user, variables, setSubjectName } = props
    const [subjectData, setSubjectData, error] = useSharedState([getSingleSubjectBySlug, variables])
    const gotNonResponse = handleNonResponses(subjectData, error)

    useEffect(() => {
      if (subjectData) {
        setSubjectName && setSubjectName(subjectData.subjects[0].name)
      }
    }, [setSubjectName, subjectData])


    if (gotNonResponse) return gotNonResponse
    const subjectId = subjectData.subjects[0].id
    return (
      <WrappedComponent {...props} subjectId={subjectId} variables={{ level: user.organization.school_type, subjectId: subjectId }} />
    )
  }
}


function ManageCapabilities(props) {
  const { variables } = props
  const [modulesData, setModulesData, error] = useSharedState([getModules, variables])
  const gotNonResponse = handleNonResponses(modulesData)
  const [currentStage, setCurrentStage] = useState(null)

  useEffect(() => {
    if (modulesData) {
      setCurrentStage(modulesData.modules[0])
    }
  }, [modulesData])

  //if (gotNonResponse) return gotNonResponse
  return (
    <>
      {modulesData && <StagePicker {...props} stages={modulesData.modules} setCurrentStage={setCurrentStage} />}
      <Capabilities {...props} setModulesData={setModulesData} currentStage={currentStage} setCurrentStage={setCurrentStage} />

    </>
  )

}

export default SubjectGetter(ManageCapabilities)