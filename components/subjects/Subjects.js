import PropTypes from 'prop-types'
import { Box } from '@material-ui/core';
import { allSubjectsQuery, allRainbowAwardsQuery } from '../../queries/Subjects';
import useStateOnce from '../data-fetching/useStateOnce';
import handleNonResponses from '../data-fetching/handleNonResponses';
import SubjectTiles from '../subjects/SubjectTiles';
import { useRouter } from 'next/router';

function Subjects({ linkTo, isRainbowAwards, ...other }) {
  const router = useRouter();

  const subjectsQuery = isRainbowAwards ? allRainbowAwardsQuery : allSubjectsQuery

  const [subjectsData, error] = useStateOnce(subjectsQuery);
  const gotNonResponse = handleNonResponses(subjectsData, error);
  if (gotNonResponse) return gotNonResponse;
  let subjects = subjectsData.subjects;
  if (!isRainbowAwards) {
    // Get all parent subjects (may change in Strapi)
    const parentSubjectsAll = subjects.map((subject) => subject.isChildOf).filter(v => v !== null)
    const parentSubjects = [...new Set(parentSubjectsAll)]
    const subjectsWithParents = parentSubjects.map((parent) => ({ name: parent, isCore: true, subjects: subjects.map((s) => s.isChildOf === parent ? s : null).filter(v => v !== null) }))
    const subjectsWithoutRainbowOrEarlyDevelopment = subjects.map((s) => s.isRainbowAwards | s.isEarlyDevelopment ? null : s).filter(v => v !== null)
    const normalSubjects = subjectsWithoutRainbowOrEarlyDevelopment.map((s) => !s.isChildOf ? s : null).filter(v => v !== null)
    subjects = [...subjectsWithParents, ...normalSubjects]
    subjects.sort((a, b) => a.name.localeCompare(b.name))
  }

  subjects.sort((a, b) => {
    const aNum = a.isCore ? 'a' : 'b';
    const bNum = b.isCore ? 'a' : 'b';
    return aNum.localeCompare(bNum)
  });
  const onwardHref = linkTo ? linkTo : router.asPath;
  return (
    <>
      <Box>
        <SubjectTiles {...other} subjects={subjects} onwardHref={onwardHref} />
      </Box>
    </>
  );
}

Subjects.propTypes = {
  linkTo: PropTypes.string,
  isRainbowAwards: PropTypes.bool
}

export default Subjects;
