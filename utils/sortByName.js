export default function sortByName(list) {
  if (!list) return;
  list.sort((a, b) => {
    if (a.name) {
      return a.name.localeCompare(b.name, 'en', { numeric: true });
    } else if (a.username) {
      return a.username.localeCompare(b.username, 'en', { numeric: true });
    }
  });
  return list;
}
