export function formatDate(date: string | Date | undefined): string {
  if (date === undefined) return;

  return Intl.DateTimeFormat().format(new Date(date));
}

export function formatMoney(date: string | number): string {
  return Intl.NumberFormat(undefined, { currency: 'EUR', style: 'currency', maximumFractionDigits: 0 }).format(Number(date));
}
