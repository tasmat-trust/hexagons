import Link from "next/link"
import { Slider } from "@reach/slider"
import "@reach/slider/styles.css"

export default function PupilCard({ pupil }) {
  return (
    <li>
      <Link href="/pupils/[id]" as={`/pupils/${pupil.id}`}>
        <>
          <a>{pupil.name}</a>
        </>
      </Link>
      <ul>
        {pupil.groups.map((group) => (
          <li>{group}</li>
        ))}
      </ul>
      {pupil.subjects.map((subject) => (
        <>
          <h3>{subject.name}</h3>
          <Slider disabled={true} value={subject.percent} min={0} max={100} />
        </>
      ))}
    </li>
  )
}
