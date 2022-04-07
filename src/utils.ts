export function formatDate(date: string | Date): string {
  return Intl.DateTimeFormat().format(new Date(date));
}

export function formatMoney(date: string | number): string {
  return Intl.NumberFormat(undefined, { currency: 'EUR', style: 'currency' }).format(Number(date));
}

export function parseQueryParams() {
  const url = window.location.search;
  const query = url.substr(1);

  const params = new URLSearchParams();

  query.split('&').forEach(function (part) {
    const item = part.split('=');
    params.append(item[0], decodeURIComponent(item[1]));
  });
  return params;
}
