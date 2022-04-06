export function formattedDate(date: string | Date): string {
  return Intl.DateTimeFormat().format(new Date(date));
}
