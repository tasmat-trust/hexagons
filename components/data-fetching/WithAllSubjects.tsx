import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';
import { HexagonsContext } from './HexagonsContext';
import {
  allSubjectsQuery,
  allRainbowAwardsQuery,
  allEarlyDevelopmentQuery,
  allFunctionalSkillsQuery,
} from '../../queries/Subjects';
import useSWR from 'swr';
import makeManualGraphQLRequest from './makeManualGraphQLRequest';

const byCoreSubjects = (a, b) => {
  const aNum = a.isCore ? 'a' : 'b';
  const bNum = b.isCore ? 'a' : 'b';
  return aNum.localeCompare(bNum);
};

export default function WithAllSubjects(WrappedComponent) {
  function WithAllSubjects({
    isRainbowAwards,
    getEverythingCombined,
    isEarlyDevelopment,
    isFunctionalSkills,
    user,
    ...other
  }) {
    let subjectsQuery = isRainbowAwards ? allRainbowAwardsQuery : allSubjectsQuery;
    subjectsQuery = isFunctionalSkills ? allFunctionalSkillsQuery : subjectsQuery
    subjectsQuery = isEarlyDevelopment ? allEarlyDevelopmentQuery : subjectsQuery;

    const { data: subjectsData } = useSWR(subjectsQuery, { suspense: true });
 
    const [rainbowSubjects, setRainbowSubjects] = useState();
    const { orgId } = useContext(HexagonsContext);

    useEffect(() => {
      async function getRD() {
        if (getEverythingCombined) {
          const rainbowData = await makeManualGraphQLRequest({
            query: allRainbowAwardsQuery,
            strapiToken: user.strapiToken,
          });
          setRainbowSubjects(rainbowData);
        }
      }

      getRD();
    }, [getEverythingCombined]);

    let subjectsFilteredByOrg = subjectsData.subjects.filter((subj, i) => {
      if (!subj.organization) {
        return subj;
      } else {
        if (parseInt(subj.organization.id) === orgId) {
          return subj;
        }
      }
    });

    let subjects = subjectsFilteredByOrg; 
    let allSubjects = subjectsFilteredByOrg
    const mainSubjects = subjects
    .map((s) => (s.isRainbowAwards | s.isTransition | s.isEarlyDevelopment | s.isFunctionalSkills ? null : s))
    .filter((v) => v !== null);

    if (!isEarlyDevelopment && !isRainbowAwards && !isFunctionalSkills) {
      subjects = mainSubjects
    }

    const normalSubjects = subjects
      .map((s) => (!s.isChildOf ? s : null))
      .filter((v) => v !== null);

    // Get all parent subjects (may change in Strapi)
    const parentSubjectsAll = subjects
      .map((subject) => subject.isChildOf)
      .filter((v) => v !== null);
    const parentSubjects = [...new Set(parentSubjectsAll)];
    const subjectsWithParents = parentSubjects.map((parent) => {
      const childSubjects = subjects
        .map((s) => (s.isChildOf === parent ? s : null))
        .filter((v) => v !== null);
      // Now sort childSubjects ensuring any isCore comes first
      childSubjects.sort(byCoreSubjects);
      return {
        name: parent,
        isCore: childSubjects[0].isCore,
        subjects: childSubjects,
      };
    });

    subjects = [...subjectsWithParents, ...normalSubjects];
    subjects.sort((a, b) => a.name.localeCompare(b.name));

    subjects.sort(byCoreSubjects);

    if (getEverythingCombined && rainbowSubjects) {
      allSubjects = [...allSubjects, ...rainbowSubjects.data.subjects];
      subjects = [...subjects, ...rainbowSubjects.data.subjects];
    }

 
    return (
      <WrappedComponent
        subjects={subjects}
        isRainbowAwards={isRainbowAwards}
        isEarlyDevelopment={isEarlyDevelopment}
        allSubjects={allSubjects}
        user={user}
        {...other}
      />
    );
  }
  WithAllSubjects.propTypes = {
    isRainbowAwards: PropTypes.bool,
    isEarlyDevelopment: PropTypes.bool,
    getEverythingCombined: PropTypes.bool,
  };
  return WithAllSubjects;
}
