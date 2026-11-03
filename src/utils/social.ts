/** The next four Mondays, starting from the server's `nextWeek`. */
export function nextMondays(first: string): string[] {
  const start = new Date(`${first}T00:00:00Z`).getTime();
  return Array.from({ length: 4 }, (_, i) =>
    new Date(start + i * 7 * 864e5).toISOString().slice(0, 10),
  );
}

export const utc = (iso: string) => `${iso.slice(0, 16).replace('T', ' ')} UTC`;
