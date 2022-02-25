import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';
import { HexagonsContext } from './HexagonsContext';
import { allSubjectsQuery, allRainbowAwardsQuery } from '../../queries/Subjects';
import useSWR from 'swr';
import makeManualGraphQLRequest from './makeManualGraphQLRequest';

const byCoreSubjects = (a, b) => {
  const aNum = a.isCore ? 'a' : 'b';
  const bNum = b.isCore ? 'a' : 'b';
  return aNum.localeCompare(bNum);
};

export default function WithAllSubjects(WrappedComponent) {
  function WithAllSubjects({ isRainbowAwards, getEverythingCombined, user, ...other }) {
    const subjectsQuery = isRainbowAwards ? allRainbowAwardsQuery : allSubjectsQuery;

    const { data: subjectsData } = useSWR(subjectsQuery, { suspense: true });
    const [rainbowSubjects, setRainbowSubjects] = useState();
    const { orgId } = useContext(HexagonsContext);

    useEffect(() => {
      async function getRD() {
        const rainbowData = await makeManualGraphQLRequest({
          query: allRainbowAwardsQuery,
          strapiToken: user.strapiToken,
        });
        setRainbowSubjects(rainbowData);
      }

      if (getEverythingCombined) {
        getRD();
      }
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
    let allSubjects = subjectsFilteredByOrg;
    if (!isRainbowAwards) {
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
      const subjectsWithoutRainbowOrEarlyDevelopment = subjects
        .map((s) => (s.isRainbowAwards | s.isEarlyDevelopment ? null : s))
        .filter((v) => v !== null);
      allSubjects = subjectsWithoutRainbowOrEarlyDevelopment;
      const normalSubjects = subjectsWithoutRainbowOrEarlyDevelopment
        .map((s) => (!s.isChildOf ? s : null))
        .filter((v) => v !== null);
      subjects = [...subjectsWithParents, ...normalSubjects];
      subjects.sort((a, b) => a.name.localeCompare(b.name));
    }

    allSubjects.sort(byCoreSubjects);
    subjects.sort(byCoreSubjects);

    if (getEverythingCombined && rainbowSubjects) {
      allSubjects = [...allSubjects, ...rainbowSubjects.data.subjects];
      subjects = [...subjects, ...rainbowSubjects.data.subjects];
    }

    return (
      <WrappedComponent
        subjects={subjects}
        isRainbowAwards={isRainbowAwards}
        allSubjects={allSubjects}
        user={user}
        {...other}
      />
    );
  }
  WithAllSubjects.propTypes = {
    isRainbowAwards: PropTypes.bool,
    getEverythingCombined: PropTypes.bool,
  };
  return WithAllSubjects;
}
