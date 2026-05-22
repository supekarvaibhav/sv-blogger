export function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}
