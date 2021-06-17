import { useRouter } from "next/router"
import useSWR from "swr"
import PupilCard from "../../components/pupil/PupilCard"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"
import { Typography } from "@material-ui/core"

import HexagonTiles from "../../components/HexagonTiles"
import checkSession from '../../components/auth/CheckSession'

import { fetcher } from '../../utils';

export default function Pupil() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.id && `/api/pupils/${query.id}`,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  const pupil = data

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

      <HexagonTiles subjects={pupil.subjects} />

      <PupilCard pupil={pupil} />
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Authenticated')
}