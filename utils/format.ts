/**
 * Converts bytes to megabytes or gigabytes with appropriate formatting
 *
 * @param bytes Number of bytes to convert
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted string with MB or GB suffix (e.g., "25.50 MB" or "1.25 GB")
 */
export function formatBytesToMB(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 MB";

  const megabytes = bytes / (1024 * 1024);

  if (megabytes >= 1024) {
    const gigabytes = megabytes / 1024;
    return `${gigabytes.toFixed(decimals)} GB`;
  }

  return `${megabytes.toFixed(decimals)} MB`;
}
