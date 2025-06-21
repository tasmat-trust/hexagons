export default function getLatestTarget(targets) {
  console.log('getLatestTarget: input targets =', targets);
  
  // Check if we have targets data
  if (!targets || !Array.isArray(targets) || targets.length === 0) {
    console.log('getLatestTarget: returning null - no targets');
    return null;
  }

  // Get the first (latest) target from the array
  const targetData = targets[0];
  console.log('getLatestTarget: processing targetData =', targetData);
  
  // Handle GraphQL structure: targets.data[0] contains the actual target
  const target = targetData?.attributes || targetData;
  const targetId = targetData?.id || target?.id;
  
  console.log('getLatestTarget: extracted target =', target);
  
  // Extract the relevant fields directly from the target object
  const {
    initial_score: initialScore = null,
    target_score: targetScore = null,
    publishedAt = null,
    pupilSubjectScore
  } = target || {};

  // Extract current score from the pupilSubjectScore (handle GraphQL structure)
  const scoreData = pupilSubjectScore?.data?.attributes || pupilSubjectScore;
  const currentScore = scoreData?.current_score ?? null;
  console.log('getLatestTarget: pupilSubjectScore =', pupilSubjectScore, 'currentScore =', currentScore);
 
  // Return a clean object with the extracted data
  const result = {
    id: targetId,
    initialScore,
    targetScore,
    currentScore,
    publishedAt
  };
  console.log('getLatestTarget: returning result =', result);
  return result;
}
