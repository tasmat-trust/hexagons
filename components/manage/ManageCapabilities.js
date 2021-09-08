import { useEffect } from "react"
import useSWR from "swr"
import { getModules, getSingleSubjectBySlug } from '../../queries/Subjects'
import StagePicker from "../subjects/StagePicker"
import Capabilities from "../subjects/Capabilities"
import { useState } from "react"

function SubjectGetter(WrappedComponent) {
  return function SubjectGetter(props) {
    const { user, variables, setSubjectName } = props
    const { data: subjectData } = useSWR([getSingleSubjectBySlug, variables], { suspense: true })


    useEffect(() => { // Possible race condition cause
      if (subjectData) {
        setSubjectName && setSubjectName(subjectData.subjects[0].name)
      }
    }, [setSubjectName, subjectData])

    const subjectId = subjectData.subjects[0].id
    return (
      <WrappedComponent {...props} subjectId={subjectId} variables={{ level: user.organization.school_type, subjectId: subjectId }} />
    )
  }
}


function ManageCapabilities(props) {
  const { variables } = props
  const { data: modulesData, mutate: setModulesData } = useSWR([getModules, variables], { suspense: true })
  const [currentStage, setCurrentStage] = useState(null)

  useEffect(() => {
    if (modulesData) {
      setCurrentStage(modulesData.modules[0])
    }
  }, [modulesData])

  return (
    <>
      <StagePicker {...props} stages={modulesData.modules} setCurrentStage={setCurrentStage} />
      <Capabilities {...props} setModulesData={setModulesData} currentStage={currentStage} setCurrentStage={setCurrentStage} />

    </>
  )

}

export default SubjectGetter(ManageCapabilities)