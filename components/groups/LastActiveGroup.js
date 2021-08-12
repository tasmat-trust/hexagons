import { useState, useEffect } from "react"
import PupilsAndGroups from "./PupilsAndGroups"

export default function LastActiveGroup(props) {
  const [activeGroup, setActiveGroup] = useState()
  useEffect(() => {
    if (window.localStorage) {
      const savedGroup = window.localStorage.getItem('active-group')
      savedGroup && setActiveGroup(savedGroup)
    }

  }, [])
  
  return (
    <>
      <h1>Hello, {props.user.username}</h1>
      <p>Your most recent active group was {activeGroup}. You can choose another group or search for an individual pupil.</p>
      <PupilsAndGroups {...props} activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
    </>
  )
}
