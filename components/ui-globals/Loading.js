import { Typography } from "@material-ui/core"

export default function Loading(props) {
  const {message} = props
  return (
    <Typography>{message}</Typography>
  )
}