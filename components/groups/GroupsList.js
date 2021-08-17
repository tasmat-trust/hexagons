import { Paper, Link, Typography } from "@material-ui/core"
import useAdminPage from "../../styles/useAdminPage"
import { useEffect } from "react"
import { allGroups, myGroups } from "../../queries/Groups"
import useSharedState from "../data-fetching/useSharedState"
import handleNonResponses from '../data-fetching/handleNonResponses'
import { useRouter } from 'next/router'

export default function GroupsList(props) {
  const { variables, setSharedState, getMyGroups, setActiveGroup } = props
  const router = useRouter()
  let query = getMyGroups ? myGroups : allGroups

  const classes = useAdminPage()
  const [groupsData, setGroupsData, error] = useSharedState([query, variables])

  useEffect(() => {
    if (setGroupsData && setSharedState) setSharedState({ update: setGroupsData })
  }, [setSharedState, setGroupsData])

  useEffect(() => {
    if (getMyGroups && groupsData && groupsData.groups.length > 0) {
      if (!window.localStorage.getItem('active-group')) {
        // No active group so let's get their first assigned group
        setActiveGroup(groupsData.groups[0].slug)
      }
    }
  }, [getMyGroups, groupsData, setActiveGroup])

  const gotNonResponse = handleNonResponses(groupsData, error)
  if (gotNonResponse) return gotNonResponse



  function storeRecentGroup(e, group, target) {

    e.preventDefault()
    localStorage.setItem('active-group', group.slug)
    router.push(target)
  }

  return (
    <ul className={classes.ul}>
      {groupsData.groups.map((group, i) => {
        const target = `/pupils/${group.slug}`
        return (
          <li className={classes.listItem} key={`group-${i}`}>
            <Paper elevation={1} className={classes.groupBox}>
              <Link onClick={(e) => storeRecentGroup(e, group, target)} href={target} className={classes.groupBox_link}>
                <Typography className={classes.groupBox_title} variant="h5" component="h3" gutterBottom={true}>{group.name}</Typography>
              </Link>
            </Paper>
          </li>
        )
      })}
    </ul>
  )
}

