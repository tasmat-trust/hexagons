import { Typography } from "@material-ui/core"
import Link from "next/link"

export default function PupilName({ pupil, typographyVariant }) {
  return (
    <Typography variant={typographyVariant}>
      <Link href="/pupils/[id]" as={`/pupils/${pupil.id}`}>
        <a>{pupil.name}</a>
      </Link>
    </Typography>


  )
}
