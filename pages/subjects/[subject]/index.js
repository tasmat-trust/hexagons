import { withSession } from '../../../components/auth/session'
import checkSession from '../../../components/auth/checkSession'

 
import { useState } from 'react'
import BreadCrumbs from '../../../components/navigation/Breadcrumbs'

export default function Index(props) {
  const [breadcrumbPupilName, setBreadcrumbPupilName] = useState(null)
  return (
    <>
      {breadcrumbPupilName && <BreadCrumbs {...props} firstLabel="Subjects" firstHref="/subjects" secondLabel={breadcrumbPupilName} />}
       
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})