import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function WithPupil(WrappedComponent) {
  return function WithPupil(props) {
    const router = useRouter()
    const [query, setQuery] = useState(null)
    useEffect(() => {
      if (!router.isReady) return;
      setQuery(router.query)
    }, [router])

    return (
      <>
        {query && <WrappedComponent variables={{ id: query.pupil }} {...props} />}
      </>
    )

  }
}