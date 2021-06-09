import useSWR from "swr"
import PupilName from "../../components/pupil/PupilName"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSWR("/api/pupils", fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <ul>
      {data.map((p, i) => (
        <PupilName key={i} pupil={p} />
      ))}
    </ul>
  )
}
