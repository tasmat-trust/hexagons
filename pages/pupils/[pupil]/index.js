import { withSession } from '../../../middlewares/session'
import checkSession from '../../../components/auth/checkSession'

import PupilMainView from '../../../components/pupil/PupilMainView'
import { useState } from 'react'
import BreadCrumbs from '../../../components/layout/navigation/Breadcrumbs'

export default function Index(props) {
  const [breadcrumbPupilName, setBreadcrumbPupilName] = useState(null)
  return (
    <>
      {breadcrumbPupilName && <BreadCrumbs {...props} firstLabel="Pupils" firstHref="/pupils" secondLabel={breadcrumbPupilName} />}
      <PupilMainView setBreadcrumbPupilName={setBreadcrumbPupilName} {...props} />
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})