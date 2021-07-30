import { Grid, Typography } from '@material-ui/core';

import { withSession } from '../../../middlewares/session'
import checkSession from '../../../components/auth/checkSession'

import useAdminPage from "../../../styles/useAdminPage";
import Subjects from '../../../components/subjects/Subjects';
import BreadCrumbs from '../../../components/layout/navigation/Breadcrumbs';


import { getPupilById } from '../../../queries/Pupils';

import useStateOnce from '../../../components/data-fetching/useStateOnce';
import handleNonResponses from '../../../components/data-fetching/handleNonResponses';

import {WithQueryVariables} from '../../../components/pupil/WithPupil'



function Index(props) {
  const classes = useAdminPage()
  const [pupilsData, error] = useStateOnce([getPupilById, props.pupilVariables])
  const gotNonResponse = handleNonResponses(pupilsData, error)
  if (gotNonResponse) return gotNonResponse
  const pupil = pupilsData.pupils[0]
   return (
    <>
      <BreadCrumbs {...props} firstLabel="Pupils" firstHref="/pupils" secondLabel={`${pupil.name}`} />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography>{pupil.name}</Typography>
            <Subjects classes={classes} {...props} onwardHref={`/pupils/${pupil.id}`} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default WithQueryVariables(Index)

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})