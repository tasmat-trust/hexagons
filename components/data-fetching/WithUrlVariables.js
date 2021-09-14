import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { HexagonsContext } from './HexagonsContext';

export default function WithUrlVariables(WrappedComponent) {
  function WithUrlVariables(props) {
    const router = useRouter();
    const { orgId } = useContext(HexagonsContext)
    const [subjectSlug, setSubjectSlug] = useState(null);
    const [groupSlug, setGroupSlug] = useState(null);
    const [isReady, setIsReady] = useState(false)
    useEffect(() => {
      if (!router.isReady) return;
      setIsReady(true)
      if (router.query.subject) {
        setSubjectSlug(router.query.subject);
      }
      if (router.query.group) {
        setGroupSlug(router.query.group);
      }
    }, [router]);
    return (
      <>
        {isReady && <WrappedComponent
          {...props}
          activeGroupSlug={groupSlug}
          getSubjectBySlugVariables={{ slug: subjectSlug }}
          groupFromSlugVariables={{ orgId: orgId, slug: groupSlug }}
        />}
      </>
    );
  }

  return WithUrlVariables;
}
