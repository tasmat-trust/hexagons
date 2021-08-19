import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function WithUrlVariables(WrappedComponent) {
  function WithUrlVariables({ orgId, ...other }) {
    const router = useRouter();
    const [subjectSlug, setSubjectSlug] = useState(null);
    const [groupSlug, setGroupSlug] = useState(null);
    useEffect(() => {
      if (!router.isReady) return;
      if (router.query.subject) {
        setSubjectSlug(router.query.subject);
      }
      if (router.query.group) {
        setGroupSlug(router.query.group);
      }
    }, [router]);

    return (
      <>
        <WrappedComponent
          {...other}
          orgId={orgId}
          activeGroupSlug={groupSlug}
          getSubjectBySlugVariables={{ slug: subjectSlug }}
          groupFromSlugVariables={{ orgId: orgId, slug: groupSlug }}
        />
      </>
    );
  }

  WithUrlVariables.propTypes = {
    orgId: PropTypes.number,
  };

  return WithUrlVariables;
}
