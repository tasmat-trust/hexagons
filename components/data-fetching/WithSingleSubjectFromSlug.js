import PropTypes from 'prop-types';
import useSWR from 'swr';
import { useContext } from 'react';
import { getSingleSubjectBySlug } from '../../queries/Subjects';

import { HexagonsContext } from './HexagonsContext';
import Error from 'next/error';
export default function WithSingleSubjectFromSlug(WrappedComponent) {
  function WithSingleSubjectFromSlug({ getSubjectBySlugVariables, ...other }) {
    const { data: subjectData } = useSWR([getSingleSubjectBySlug, getSubjectBySlugVariables], {
      suspense: true,
    });
    const { orgId } = useContext(HexagonsContext);
    const subject = subjectData.subjects[0];
    const subjectId = parseInt(subject.id);
    const subjectName = subject.name;
    const subjectSlug = subject.slug;
    const excludeED = subject.excludeEarlyDevelopmentStep;
    const isRainbowAwardsSubject = subject.isRainbowAwards;
    let shouldShow404 = false;
    if (subject.organization?.data?.id) {
      if (parseInt(subject.organization.data.id) !== orgId) {
        shouldShow404 = true;
      }
    }

    return (
      <>
        {!shouldShow404 && (
          <WrappedComponent
            {...other}
            isRainbowAwardsSubject={isRainbowAwardsSubject}
            subjectId={subjectId}
            subjectName={subjectName}
            subjectSlug={subjectSlug}
            excludeED={excludeED}
            getSubjectBySlugVariables={getSubjectBySlugVariables}
            getModulesBySubjectIdVariables={{ subjectId: subjectId }}
          />
        )}
        {shouldShow404 && <Error statusCode={404} />}
      </>
    );
  }

  WithSingleSubjectFromSlug.propTypes = {
    getSubjectBySlugVariables: PropTypes.object,
  };

  return WithSingleSubjectFromSlug;
}
