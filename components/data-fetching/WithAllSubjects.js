import PropTypes from 'prop-types'
import { allSubjectsQuery, allRainbowAwardsQuery } from '../../queries/Subjects';
import useSWR from 'swr';


export default function WithAllSubjects(WrappedComponent) {
  function WithAllSubjects({ isRainbowAwards, ...other }) {
    const subjectsQuery = isRainbowAwards ? allRainbowAwardsQuery : allSubjectsQuery
    const { data: subjectsData } = useSWR(subjectsQuery, { suspense: true });
    let subjects = subjectsData.subjects;
    let allSubjects = subjectsData.subjects
    if (!isRainbowAwards) {
      // Get all parent subjects (may change in Strapi)
      const parentSubjectsAll = subjects.map((subject) => subject.isChildOf).filter(v => v !== null)
      const parentSubjects = [...new Set(parentSubjectsAll)]
      const subjectsWithParents = parentSubjects.map((parent) => ({ name: parent, isCore: true, subjects: subjects.map((s) => s.isChildOf === parent ? s : null).filter(v => v !== null) }))
      const subjectsWithoutRainbowOrEarlyDevelopment = subjects.map((s) => s.isRainbowAwards | s.isEarlyDevelopment ? null : s).filter(v => v !== null)
      allSubjects = subjectsWithoutRainbowOrEarlyDevelopment
      const normalSubjects = subjectsWithoutRainbowOrEarlyDevelopment.map((s) => !s.isChildOf ? s : null).filter(v => v !== null)
      subjects = [...subjectsWithParents, ...normalSubjects]
      subjects.sort((a, b) => a.name.localeCompare(b.name))
    }

    allSubjects.sort((a, b) => {
      const aNum = a.isCore ? 'a' : 'b';
      const bNum = b.isCore ? 'a' : 'b';
      return aNum.localeCompare(bNum)
    });


    subjects.sort((a, b) => {
      const aNum = a.isCore ? 'a' : 'b';
      const bNum = b.isCore ? 'a' : 'b';
      return aNum.localeCompare(bNum)
    });

    return <WrappedComponent subjects={subjects} isRainbowAwards={isRainbowAwards} allSubjects={allSubjects} {...other} />
  }
  WithAllSubjects.propTypes = {
    isRainbowAwards: PropTypes.bool
  }
  return WithAllSubjects
}




