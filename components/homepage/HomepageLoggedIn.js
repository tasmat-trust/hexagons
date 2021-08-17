import BreadCrumbs from "../navigation/Breadcrumbs"
import LastActiveGroup from "../groups/LastActiveGroup"

export default function HomepageLoggedIn(props) {
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Home" />
      <LastActiveGroup {...props} />
    </>
  )
}
