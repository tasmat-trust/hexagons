export default function sortByName(list) {
  list.sort((a, b) => {
    return a.name.localeCompare(b.name, 'en', {numeric: true})
  });
  return list
}