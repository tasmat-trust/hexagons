import {
  deletePupil,
  getForDeletionLevels,
  getForDeletionCompetencies,
} from '../../../queries/Pupils';
import { flattenDataAttributes } from '../../data-fetching/useSWRWrapped';
import { deleteCompetencies } from './deleteCompetencies';
import { deleteLevels } from './deleteLevels';

async function deletePup(gqlClient, pupilId) {
  try {
    const data = await gqlClient.request(deletePupil, { id: pupilId });
    if (data) {
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default async function deletePupilCompletely(gqlClient, pupilId, triggerSharedState) {
  async function delete100Competencies() {
    const data = await gqlClient.request(getForDeletionCompetencies, {
      pupilId: pupilId,
    });
    const competenciesData = flattenDataAttributes(data);
    if (competenciesData.competencies && competenciesData.competencies.length > 0) {
      await deleteCompetencies(gqlClient, competenciesData.competencies);
    }
    if (competenciesData.competencies.length === 100) {
      delete100Competencies();
      return false;
    }
    return true;
  }

  await delete100Competencies();

  const data = await gqlClient.request(getForDeletionLevels, { pupilId: pupilId });
  const levelsData = flattenDataAttributes(data);

  if (levelsData.levels && levelsData.levels.length > 0) {
    await deleteLevels(gqlClient, levelsData.levels);
  }
  await deletePup(gqlClient, pupilId);

  if (triggerSharedState) triggerSharedState.update();
}
