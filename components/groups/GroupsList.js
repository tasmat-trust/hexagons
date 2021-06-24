import { Paper, Link, Typography } from "@material-ui/core"

import useAdminPage from "../../styles/useAdminPage"


export default function GroupsList({ groups }) {

  const classes = useAdminPage()

  return (
    <ul className={classes.ul}>
      {groups.map((group, i) => (
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

