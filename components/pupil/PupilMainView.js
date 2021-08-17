import { Grid, Typography } from '@material-ui/core';
import useAdminPage from "../../styles/useAdminPage";
import Subjects from '../subjects/Subjects';

import { WithQueryVariables } from '../data-fetching/WithPupil'
import WithGroupFromSlug from '../data-fetching/WithGroupFromSlug'
import { getPupilById } from '../../queries/Pupils';

import useStateOnce from '../data-fetching/useStateOnce';
import handleNonResponses from '../data-fetching/handleNonResponses';
import { useEffect } from 'react';

function PupilMainView(props) {
  const { setBreadcrumbPupilName } = props

  const classes = useAdminPage()
  const [pupilsData, error] = useStateOnce([getPupilById, props.pupilVariables])

  useEffect(() => {
    if (pupilsData && pupilsData.pupils.length > 0) {
      setBreadcrumbPupilName && setBreadcrumbPupilName(pupilsData.pupils[0].name)
    }
  }, [pupilsData, setBreadcrumbPupilName])

  const gotNonResponse = handleNonResponses(pupilsData, error)
  if (gotNonResponse) return gotNonResponse
  const pupil = pupilsData.pupils[0]


  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography>{pupil.name}</Typography>
            <Subjects classes={classes} {...props} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default WithQueryVariables(WithGroupFromSlug(PupilMainView))