export default function getTodayDate() {
  const date = new Date(); // 2009-11-10
  const month = date.toLocaleString('default', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return month;
}
