export function formatDate(date: string | Date): string {
  return Intl.DateTimeFormat().format(new Date(date));
}

export function formatMoney(date: string | number): string {
  return Intl.NumberFormat(undefined, { currency: 'EUR', style: 'currency' }).format(Number(date));
}
