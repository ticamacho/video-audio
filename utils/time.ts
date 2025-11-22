export function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a date to the "24 Mar 10:30" format with timezone awareness
 *
 * @param dateString ISO date string to format
 * @param options Configuration options
 * @returns Formatted date string with timezone info
 */
export function formatDateTime(
  dateString: string | null | undefined,
  options: {
    timezone?: string;
    showTimezone?: boolean;
  } = {},
): string | null {
  if (!dateString) return null;

  const date = new Date(dateString);

  // Auto-detect user's timezone if not provided
  const timezone =
    options.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Format with user's timezone
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formatted = formatter.format(date);

  // Add timezone abbreviation if requested
  if (options.showTimezone) {
    const timezoneName = new Intl.DateTimeFormat("en", {
      timeZone: timezone,
      timeZoneName: "short",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value;

    return `${formatted} ${timezoneName}`;
  }

  return formatted;
}

/**
 * Calculates elapsed time from a start timestamp to now
 * @param startTime - ISO timestamp string or Date object
 * @returns Formatted time string in HH:MM:SS format
 */
export const calculateElapsedTime = (startTime: string | Date): string => {
  if (!startTime) return "00:00:00";

  const start = typeof startTime === "string" ? new Date(startTime) : startTime;
  const now = new Date();

  if (isNaN(start.getTime())) return "00:00:00";

  const elapsedSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);

  // Handle negative elapsed time (future start time)
  if (elapsedSeconds < 0) return "00:00:00";

  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * Formats elapsed seconds into HH:MM:SS format
 * @param totalSeconds - Total elapsed seconds
 * @returns Formatted time string in HH:MM:SS format
 */
export const formatElapsedSeconds = (totalSeconds: number): string => {
  if (totalSeconds < 0) return "00:00:00";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * Calculate the number of days from now to a given date
 *
 * @param date ISO date string or Date object
 * @returns Number of days (positive for future dates, negative for past dates), or 0 if invalid date
 */
export function getDaysFromNow(date: string | Date): string {
  if (!date) return "N/A";

  const targetDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(targetDate.getTime())) {
    return "N/A";
  }

  const now = new Date();
  const diffInMs = targetDate.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return `${diffInDays} days`;
}
