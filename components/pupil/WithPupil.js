import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSharedState from '../data-fetching/useSharedState';
import useStateOnce from '../data-fetching/useStateOnce';
import { getPupilById, getLevels } from '../../queries/Pupils';
import { getSingleSubjectBySlug } from '../../queries/Subjects'
import handleNonResponses from '../data-fetching/handleNonResponses';
import { getOrgIdFromSession } from '../../utils';

function WithQueryVariables(WrappedComponent) {
  return function WithPupil(props) {
    const {user } = props
    const orgId = getOrgIdFromSession(user)
    const router = useRouter()
    const [query, setQuery] = useState(null)
    useEffect(() => {
      if (!router.isReady) return;
      setQuery(router.query)
    }, [router])
 
    return (
      <>
        {query && <WrappedComponent subjectVariables={{ slug: query.subject }} pupilVariables={{ id: query.pupil, orgId: orgId }} {...props} />}
      </>
    )
  }
}

function WithPupilData(WrappedComponent) {
  return function WithPupilData(props) {
    const [pupilsData, error] = useStateOnce([getPupilById, props.pupilVariables])
    const gotNonResponse = handleNonResponses(pupilsData, error, 'No pupil found')
    if (gotNonResponse) return gotNonResponse
    const pupil = pupilsData.pupils[0]
    return (
      <WrappedComponent {...props} pupil={pupil} />
    )
  }
}

function WithSubjectData(WrappedComponent) {
  return function WithPupilData(props) {
    const [subjectData, error] = useStateOnce([getSingleSubjectBySlug, props.subjectVariables])
    const gotNonResponse = handleNonResponses(subjectData, error, 'Subject not found')
    if (gotNonResponse) return gotNonResponse
    const subject = subjectData.subjects[0]
    return (
      <WrappedComponent {...props} subject={subject} levelVariables={{ pupilId: props.pupil.id, subjectId: subject.id }} />
    )
  }
}

function WithCurrentLevel(WrappedComponent) {
  return function WithCurrentLevel(props) {
    const [levelsData, mutateLevelsData, error] = useSharedState([getLevels, props.levelVariables])
    const gotNonResponse = handleNonResponses(levelsData, error, 'No levels found')
    let currentLevel = null;
    if (!gotNonResponse) {
      currentLevel = levelsData.levels[0] // TODO calculate earliest level from module order
    }  
    return (
      <WrappedComponent {...props} level={currentLevel} />
    )
  }
}



export {
  WithQueryVariables,
  WithSubjectData,
  WithPupilData,
  WithCurrentLevel
}