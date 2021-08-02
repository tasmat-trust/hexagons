import { Typography, Box } from "@material-ui/core"

export default function LevelStatus({currentLevel, subject}) {
  console.log(currentLevel)
  return (
    <Box>
      <Typography variant='h1'>{subject.name}</Typography>
      <Typography variant='h2'>{currentLevel.module.level === 'primary' ? 'Step' : 'Stage'} {currentLevel.module.order}</Typography>
    </Box>
     
  )
}