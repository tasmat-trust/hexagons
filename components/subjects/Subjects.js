import { Box } from '@material-ui/core';
import { allSubjects } from '../../queries/Subjects';
import useStateOnce from '../data-fetching/useStateOnce';
import handleNonResponses from '../data-fetching/handleNonResponses';
import SubjectTiles from '../subjects/SubjectTiles';
import { useRouter } from 'next/router';

function Subjects({ linkTo }) {
  const router = useRouter();
  const [subjectsData, error] = useStateOnce(allSubjects);
  const gotNonResponse = handleNonResponses(subjectsData, error);
  if (gotNonResponse) return gotNonResponse;
  const subjects = subjectsData.subjects;
  subjects.sort(function (a, b) {
    const aNum = a.isCore ? 1 : 0;
    const bNum = b.isCore ? 1 : 0;
    return aNum < bNum;
  });

  const onwardHref = linkTo ? linkTo : router.asPath;

  return (
    <>
      <Box>
        <SubjectTiles subjects={subjects} onwardHref={onwardHref} />
      </Box>
    </>
  );
}

export default Subjects;
