import Link from "next/link"

export default function PupilName({ pupil }) {
  return (
    <li>
      <Link href="/pupils/[id]" as={`/pupils/${pupil.id}`}>
        <a>{pupil.name}</a>
      </Link>
    </li>
  )
}
