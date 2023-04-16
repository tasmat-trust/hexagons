import { Grid } from '@mui/material';
import Subjects from './Subjects';
import { useContext } from 'react';
import { HexagonsContext } from '../data-fetching/HexagonsContext';



const AllSubjects = (props) => {

  const { useFunctionalSkills } = useContext(HexagonsContext);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <h2>Core subjects</h2>
          <Subjects classes={props.classes} {...props} onwardHref={props.onwardHref} />
        </Grid>
        <Grid item md={12} xs={12}>
          <h2>Rainbow Awards</h2>
          <Subjects
            isRainbowAwards={true}
            classes={props.classes}
            {...props}
            onwardHref={props.onwardHref}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <h2>Early development</h2>
          <Subjects
            isEarlyDevelopment={true}
            classes={props.classes}
            {...props}
            onwardHref={props.onwardHref}
          />
        </Grid>

        {useFunctionalSkills && (
        <Grid item md={12} xs={12}>
          <h2>Functional skills</h2>
          <Subjects
            isFunctionalSkills={true}
            classes={props.classes}
            {...props}
            onwardHref={props.onwardHref}
          />
        </Grid>)}
      </Grid>
    </>
  );
};

export default AllSubjects;
