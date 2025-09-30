import { useState, useEffect } from "react";

/**
 * Custom hook to track the current window width
 * Returns the current window width and updates on resize
 *
 * @param defaultWidth - Default width to use during SSR (defaults to 1024)
 * @returns Current window width in pixels
 */
export function useWindowWidth(defaultWidth = 1024): number {
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    // Return default width for SSR
    return defaultWidth;
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Set initial value in case it wasn't set correctly during SSR hydration
    setWindowWidth(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}

/**
 * Hook to check if the current window width is below a certain breakpoint
 *
 * @param breakpoint - Width breakpoint in pixels (defaults to 768 for mobile)
 * @returns Boolean indicating if window is below the breakpoint
 */
export function useIsMobile(breakpoint = 768): boolean {
  const windowWidth = useWindowWidth();
  return windowWidth < breakpoint;
}

/**
 * Hook to check if the current window width matches Tailwind CSS breakpoints
 *
 * @returns Object with boolean values for each breakpoint
 */
export function useBreakpoints() {
  const windowWidth = useWindowWidth();

  return {
    isSm: windowWidth >= 640,
    isMd: windowWidth >= 768,
    isLg: windowWidth >= 1024,
    isXl: windowWidth >= 1280,
    is2xl: windowWidth >= 1536,
    // Inverse checks
    isBelowSm: windowWidth < 640,
    isBelowMd: windowWidth < 768,
    isBelowLg: windowWidth < 1024,
    isBelowXl: windowWidth < 1280,
    isBelowXXl: windowWidth < 1536,
  };
}
