export function timestampMelbourne(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Australia/Melbourne',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const formatted = now.toLocaleString('en-AU', options).replace(',', '').toUpperCase();
  return formatted;
}
