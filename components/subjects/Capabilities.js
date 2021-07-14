import CapabilityTiles from '../subjects/CapabilityTiles'

export default function Capabilities(props) {
  const { currentStage } = props
  if (!currentStage) return ''
  return <CapabilityTiles tiles={currentStage.capabilities} />
}