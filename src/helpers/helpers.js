export function dateBuilder(i) {
  const today = new Date();
  if (i) {
    const newDate = new Date(today);
    newDate.setDate(newDate.getDate() + i);
    return newDate.toDateString();
  }

  return today.toDateString();
}