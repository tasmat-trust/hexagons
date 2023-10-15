export default function getLevelLabel(levelType) {
  if (!levelType) return '';
  const firstChar = levelType.charAt(0);
  return levelType.replace(firstChar, firstChar.toUpperCase());
}
