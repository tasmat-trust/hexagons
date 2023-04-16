import { deleteLevel } from './deleteLevel';

async function deleteLevels(gqlClient, levels) {
  await levels.map(async (level, i) => await deleteLevel(gqlClient, { id: level.id }));
  return true;
}

export { deleteLevels };
