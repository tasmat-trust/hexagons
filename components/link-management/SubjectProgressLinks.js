import PropTypes from 'prop-types';

export default function SubjectProgressLinks(WrappedComponent) {
  function SubjectProgressLinks({
    subjectSlug,
    activeGroupSlug,
    pupilId,
    isSubjectsListing,
    isRainbowAwards,
    ...other
  }) {
    //  {router && router.asPath &&
    let linkUrl;
    if (isSubjectsListing || isRainbowAwards) {
      let basePath = 'subjects'; // Is a core subject on a rainbow-awards page
      if (isRainbowAwards) {
        basePath = 'rainbow-awards';
      }
      linkUrl = `/${basePath}/${subjectSlug}/${activeGroupSlug}/${pupilId}`;
    } else {
      linkUrl = `/pupils/${activeGroupSlug}/${pupilId}/${subjectSlug}`;
    }

    return (
      <WrappedComponent
        linkUrl={linkUrl}
        isRainbowAwards={isRainbowAwards}
        isSubjectsListing={isSubjectsListing}
        {...other}
      />
    );
  }

  SubjectProgressLinks.propTypes = {
    isSubjectsListing: PropTypes.bool,
    isRainbowAwards: PropTypes.bool,
    subjectSlug: PropTypes.string,
    pupilId: PropTypes.number,
    activeGroupSlug: PropTypes.string,
  };
  return SubjectProgressLinks;
}
