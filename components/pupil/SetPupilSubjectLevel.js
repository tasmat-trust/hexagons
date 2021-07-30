import StagesTabs from "../navigation/StagesTabs"
import { Typography } from "@material-ui/core"

export default function SetPupilSubjectLevel(props) {
  const { subject, pupil } = props
  return (
    <>
    <Typography variant="h2">{`${pupil.name}'s ${subject.name} Baseline`}</Typography>
    <Typography>Please go to step or stage that {pupil.name} is currently working at and mark off as many competencies as you can.</Typography>
    <StagesTabs {...props} isAdmin={false} isBaseline={true} variables={{ slug: subject.slug }}/>
    </>
  )
}

