export default function getLevelLabel(levelType) {
  const firstChar = levelType.charAt(0)
  return levelType.replace(firstChar, firstChar.toUpperCase())
}