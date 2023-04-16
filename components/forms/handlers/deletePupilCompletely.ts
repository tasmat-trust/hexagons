import {
  deletePupil,
  getForDeletionLevels,
  getForDeletionCompetencies,
} from '../../../queries/Pupils';
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
    const competenciesData = await gqlClient.request(getForDeletionCompetencies, {
      pupilId: pupilId,
    });
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

  const levelsData = await gqlClient.request(getForDeletionLevels, { pupilId: pupilId });
  if (levelsData.levels && levelsData.levels.length > 0) {
    await deleteLevels(gqlClient, levelsData.levels);
  }
  await deletePup(gqlClient, pupilId);

  if (triggerSharedState) triggerSharedState.update();
}
