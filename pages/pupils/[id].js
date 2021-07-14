 
import PupilCard from "../../components/pupil/PupilCard"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"
import { Typography } from "@material-ui/core"

import SubjectTiles from "../../components/subjects/SubjectTiles"
import checkSession from '../../components/auth/CheckSession'

 

export default function Pupil() {

 

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/pupils">
          Pupils
        </Link>
        <Typography>{pupil.name}</Typography>
      </Breadcrumbs>

      <SubjectTiles subjects={pupil.subjects} />

      {/* <PupilCard pupil={pupil} /> */}
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Teacher')
}