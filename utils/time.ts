/**
 * Calculates elapsed time from a start timestamp to now
 * @param startTime - ISO timestamp string or Date object
 * @returns Formatted time string in HH:MM:SS format
 */
export const calculateElapsedTime = (startTime: string | Date): string => {
  if (!startTime) return "00:00:00";

  const start = typeof startTime === 'string' ? new Date(startTime) : startTime;
  const now = new Date();

  if (isNaN(start.getTime())) return "00:00:00";

  const elapsedSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);

  // Handle negative elapsed time (future start time)
  if (elapsedSeconds < 0) return "00:00:00";

  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};