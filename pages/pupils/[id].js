import { useRouter } from "next/router"
import useSWR from "swr"
import PupilCard from "../../components/pupil/PupilCard"

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Pupil() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.id && `/api/pupils/${query.id}`,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <PupilCard pupil={data}/>
    </>
  )
}
