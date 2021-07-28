export function dateBuilder(i?: number): string {
  const today = new Date();
  if (i) {
    const newDate = new Date(today);
    newDate.setDate(newDate.getDate() + i);
    return newDate.toDateString();
  }

  return today.toDateString();
}