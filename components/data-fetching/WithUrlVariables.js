import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { HexagonsContext } from './HexagonsContext';
import { unslugify } from 'unslugify';

export default function WithUrlVariables(WrappedComponent) {
  function WithUrlVariables(props) {
    const router = useRouter();
    const { orgId } = useContext(HexagonsContext);
    const [subjectSlug, setSubjectSlug] = useState(null);
    const [groupSlug, setGroupSlug] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [groupName, setGroupName] = useState();
    const [subjectName, setSubjectName] = useState();
    useEffect(() => {
      if (!router.isReady) return;
      setIsReady(true);
      if (router.query.subject) {
        setSubjectSlug(router.query.subject);
      }
      if (router.query.group) {
        setGroupSlug(router.query.group);
      }
    }, [router]);

    useEffect(() => {
      if (groupSlug) {
        setGroupName(unslugify(groupSlug));
      }
      if (subjectSlug) {
        setSubjectName(unslugify(subjectSlug));
      }
    }, [groupSlug, subjectSlug]);

    return (
      <>
        {isReady && (
          <WrappedComponent
            {...props}
            activeGroupSlug={groupSlug}
            groupName={groupName}
            subjectName={subjectName}
            subjectSlug={subjectSlug}
            getSubjectBySlugVariables={{ slug: subjectSlug }}
            groupFromSlugVariables={{ orgId: orgId, slug: groupSlug }}
            pupilVariables={{ id: router.query.pupil, orgId: orgId }}
          />
        )}
      </>
    );
  }

  return WithUrlVariables;
}
