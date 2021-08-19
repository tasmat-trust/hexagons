import PropTypes from 'prop-types';
import { Paper, Link, Typography } from "@material-ui/core"
import useAdminPage from "../../styles/useAdminPage"
import { useEffect } from "react"
import { allGroups, myGroups } from "../../queries/Groups"
import useSharedState from "../data-fetching/useSharedState"
import handleNonResponses from '../data-fetching/handleNonResponses'
import { useRouter } from 'next/router'

function GroupsList({ getGroupsVariables, setSharedState, getMyGroups, setActiveGroupSlug, setActiveGroupName, setActiveGroupId }) {

  const router = useRouter()
  let query = getMyGroups ? myGroups : allGroups
  

  const classes = useAdminPage()
  const [groupsData, setGroupsData, error] = useSharedState([query, getGroupsVariables])

  useEffect(() => {
    if (setGroupsData && setSharedState) setSharedState({ update: setGroupsData })
  }, [setSharedState, setGroupsData])

  useEffect(() => {
    if (getMyGroups && groupsData && groupsData.groups.length > 0) {
      if (!window.localStorage.getItem('active-group')) {
        // No active group so let's get their first assigned group
        setActiveGroupSlug && setActiveGroupSlug(groupsData.groups[0].slug)
        setActiveGroupName && setActiveGroupName(groupsData.groups[0].name)
        setActiveGroupId && setActiveGroupId(groupsData.groups[0].id)
      }
    }
  }, [getMyGroups, groupsData, setActiveGroupSlug, setActiveGroupName])

  const gotNonResponse = handleNonResponses(groupsData, error)
  if (gotNonResponse) return gotNonResponse
  const isSubjectsListing = router.asPath.includes('subjects')


  function storeRecentGroup(e, group, linkUrl) {

    e.preventDefault()
    localStorage.setItem('active-group-slug', group.slug)
    localStorage.setItem('active-group-name', group.name)
    localStorage.setItem('active-group-id', group.id)
    router.push(linkUrl)
  }

  return (
    <ul className={classes.ul}>
      {groupsData.groups.map((group, i) => {
        
        let linkUrl
        if (isSubjectsListing) {          
          linkUrl = `/subjects/${router.query.subject}/${group.slug}`
        } else {
          linkUrl = `/pupils/${group.slug}`
        }
        return (
          <li className={classes.listItem} key={`group-${i}`}>
            <Paper elevation={1} className={classes.groupBox}>
              <Link onClick={(e) => storeRecentGroup(e, group, linkUrl)} href={linkUrl} className={classes.groupBox_link}>
                <Typography className={classes.groupBox_title} variant="h5" component="h3" gutterBottom={true}>{group.name}</Typography>
              </Link>
            </Paper>
          </li>
        )
      })}
    </ul>
  )
}

GroupsList.propTypes = {
  getGroupsVariables: PropTypes.object,
  setSharedState: PropTypes.func,
  getMyGroups: PropTypes.bool,
  setActiveGroupSlug: PropTypes.func,
  setActiveGroupName: PropTypes.func,
  setActiveGroupId: PropTypes.func
}

export default GroupsList
