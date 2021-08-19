import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function WithSingleSubjectFromSlugVariables(WrappedComponent) {

  return function WithSingleSubjectFromSlugVariables(props) {
    const { query } = useRouter()
    const [subjectSlug, setSubjectSlug] = useState(null)
    useEffect(() => {
      if (query && query.subject) {
        setSubjectSlug(query.subject)
      }
    }, [query])
    return (
      <>
        {subjectSlug && <WrappedComponent {...props} getSubjectBySlugVariables={{ slug: subjectSlug }} />}
      </>
    )
  }
}