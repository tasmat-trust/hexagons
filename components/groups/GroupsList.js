import { Paper, Link, Typography } from "@material-ui/core"
import useSharedState from "../data-fetching/useSharedState"
import useAdminPage from "../../styles/useAdminPage"

import { useEffect } from "react"

import { allGroups } from "../../queries/Groups"

export default function GroupsList(props) {
  const { variables, setSharedState } = props
  const classes = useAdminPage()
  const [state, setState, error] = useSharedState([allGroups, variables])
  useEffect(() => {
    if (setState && setSharedState) setSharedState({ update: setState })
  }, [setSharedState])

  if (error) return <Typography>Error loading</Typography>
  if (!state) return <Typography>Loading</Typography>
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

