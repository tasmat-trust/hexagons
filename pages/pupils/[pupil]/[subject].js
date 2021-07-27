import checkSession from "../../../components/auth/checkSession"
import { withSession } from "../../../middlewares/session"
import WithPupil from '../../../components/pupil/WithPupil'
import BreadCrumbs from "../../../components/layout/navigation/Breadcrumbs"
import { getPupilById } from "../../../queries/Pupils"
import useStateOnce from "../../../components/data-fetching/useStateOnce"
import handleNonResponses from "../../../components/data-fetching/handleNonResponses"

function Subject(props) {

  const [pupilsData, error] = useStateOnce([getPupilById, props.variables])
  const gotNonResponse = handleNonResponses(pupilsData, error)
  if (gotNonResponse) return gotNonResponse
  const pupil = pupilsData.pupils[0]
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Pupils" firstHref="/pupils" secondLabel={`${pupil.name}`} />
      <h1>Hello</h1>
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})

export default WithPupil(Subject)