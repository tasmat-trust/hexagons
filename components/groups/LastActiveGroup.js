import PropTypes from 'prop-types'
import { useState, useEffect } from "react"
import PupilsAndGroups from "./PupilsAndGroups"

function LastActiveGroup({ user, ...other }) {

  const [activeGroupSlug, setActiveGroupSlug] = useState()
  const [activeGroupName, setActiveGroupName] = useState()
  useEffect(() => {
    if (window.localStorage) {
      const savedGroupSlug = window.localStorage.getItem('active-group-slug')
      const savedGroupName = window.localStorage.getItem('active-group-name')
      savedGroupSlug && setActiveGroupSlug(savedGroupSlug)
      savedGroupName && setActiveGroupName(savedGroupName)
    }

  }, [])

  return (
    <>
      <h1>Hello, {user.username}</h1>
      <p>Your most recent active group was {activeGroupName}. You can choose another group or search for an individual pupil.</p>
      <PupilsAndGroups
        {...other}
        userId={user.id}
        activeGroupSlug={activeGroupSlug}
        setActiveGroupSlug={setActiveGroupSlug}
        setActiveGroupName={setActiveGroupName} />
    </>
  )
}

LastActiveGroup.propTypes = {
  user: PropTypes.object
}

export default LastActiveGroup