import { pupils, randomPupil } from '../../../data'
 
export default async function pupilHandler({ query: { id } }, res) {
  const filtered = pupils.filter((p) => p.id === id)

  // Pupil with id exists
  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    const pupil = await randomPupil(id)
    res.status(200).json(pupil)
  }
}