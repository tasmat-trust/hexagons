export default function getLatestTarget(targets) {
  // Check if we have targets data
  if (!targets || !Array.isArray(targets) || targets.length === 0) {
    return null;
  }

  // Get the first (latest) target from the array
  const target = targets[0];
  
  // Extract the relevant fields directly from the target object
  const {
    id,
    initial_score: initialScore = null,
    target_score: targetScore = null,
    publishedAt = null,
    pupilSubjectScore
  } = target || {};

  // Extract current score from the pupilSubjectScore
  const currentScore = pupilSubjectScore?.current_score ?? null;
 
  // Return a clean object with the extracted data
  return {
    id,
    initialScore,
    targetScore,
    currentScore,
    publishedAt
  };
}
