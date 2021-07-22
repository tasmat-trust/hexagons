import { Paper, Link, Typography } from "@material-ui/core"
import useAdminPage from "../../styles/useAdminPage"
import { useEffect } from "react"
import { allGroups, myGroups } from "../../queries/Groups"
import useSharedState from "../data-fetching/useSharedState"
import handleNonResponses from '../data-fetching/handleNonResponses'

export default function GroupsList(props) {
  const { variables, setSharedState, getMyGroups } = props

  let query = getMyGroups ? myGroups : allGroups

  const classes = useAdminPage()
  const [state, setState, error] = useSharedState([query, variables])

  useEffect(() => {
    if (setState && setSharedState) setSharedState({ update: setState })
  }, [setSharedState, setState])


  const gotNonResponse = handleNonResponses(state, error)
  if (gotNonResponse) return gotNonResponse


  return (
    <ul className={classes.ul}>
      {state.groups.map((group, i) => (
        <li className={classes.listItem} key={`group-${i}`}>
          <Paper elevation={1} className={classes.groupBox}>
            <Link href={`/groups/${group.slug}`} className={classes.groupBox_link}>
              <Typography className={classes.groupBox_title} variant="h5" component="h3" gutterBottom={true}>{group.name}</Typography>
            </Link>
          </Paper>
        </li>
      ))}
    </ul>
  )
}

