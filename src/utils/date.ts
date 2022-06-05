import { DateTime } from "luxon";

/** Format a JS string using `luxon` DateTime  */
export function toUTCString(date: Date, format?: string) {
  const dt = DateTime.fromJSDate(date).toUTC();
  if (format) return dt.toFormat(format);
  return dt.toString();
}
