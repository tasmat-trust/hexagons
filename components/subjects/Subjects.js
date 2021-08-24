import { Box } from '@material-ui/core';
import { allSubjectsQuery } from '../../queries/Subjects';
import useStateOnce from '../data-fetching/useStateOnce';
import handleNonResponses from '../data-fetching/handleNonResponses';
import SubjectTiles from '../subjects/SubjectTiles';
import { useRouter } from 'next/router';

function Subjects({ linkTo, ...other }) {
  const router = useRouter();
  const [subjectsData, error] = useStateOnce(allSubjectsQuery);
  const gotNonResponse = handleNonResponses(subjectsData, error);
  if (gotNonResponse) return gotNonResponse;
  const subjects = subjectsData.subjects;
  // Get all parent subjects (may change in Strapi)
  const parentSubjectsAll = subjects.map((subject) => subject.isChildOf).filter(v => v !== null)
  const parentSubjects = [...new Set(parentSubjectsAll)]
  const subjectsWithParents = parentSubjects.map((parent) => ({ name: parent, isCore: true, subjects: subjects.map((s) => s.isChildOf === parent ? s : null).filter(v => v !== null) }))
  const subjectsWithoutRainbowOrEarlyDevelopment = subjects.map((s) => s.isRainbowAwards | s.isEarlyDevelopment ? null : s).filter(v => v !== null)
  const normalSubjects = subjectsWithoutRainbowOrEarlyDevelopment.map((s) => !s.isChildOf ? s : null).filter(v => v !== null)
  const allSubjects = [...subjectsWithParents, ...normalSubjects]
  allSubjects.sort((a, b) => a.name.localeCompare(b.name))
  allSubjects.sort((a, b) => {
    const aNum = a.isCore ? 1 : 0;
    const bNum = b.isCore ? 1 : 0;
    return aNum < bNum;
  });
  const onwardHref = linkTo ? linkTo : router.asPath;
  return (
    <>
      <Box>
        <SubjectTiles {...other} subjects={allSubjects} onwardHref={onwardHref} />
      </Box>
    </>
  );
}

export default Subjects;
