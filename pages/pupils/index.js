import useSWR from "swr"


import Divider from '@material-ui/core/Divider';
import PupilName from "../../components/pupil/PupilName"
import { Typography } from "@material-ui/core";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSWR("/api/pupils", fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Typography variant="h2">Pupils</Typography>
      <Divider />
      <ul>
        {data.map((p, i) => (
          <PupilName key={i} pupil={p} />
        ))}
      </ul>
    </>
  )
}
