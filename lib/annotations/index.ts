export type Point = { x: number; y: number };
export type Stroke = Array<Point>;
export type AnnotationMessage =
  | { type: "stroke"; points: Stroke }
  | { type: "stroke_complete"; points: Stroke }
  | { type: "clear" };

/** ========================
 *  Canvas Drawing Functions
 *  ======================== */

export function drawStroke(
  canvas: HTMLCanvasElement | null,
  points: Stroke,
  videoRef?: React.RefObject<HTMLVideoElement | null>,
) {
  if (!canvas || points.length === 0) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();

  // If we have a video reference, calculate drawing area within the canvas
  if (videoRef?.current) {
    const video = videoRef.current;
    const videoRect = video.getBoundingClientRect();

    // Calculate the actual video display area within the container
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const containerAspectRatio = videoRect.width / videoRect.height;

    let videoDisplayWidth, videoDisplayHeight, videoDisplayX, videoDisplayY;

    if (videoAspectRatio > containerAspectRatio) {
      // Video is wider - fit to container width
      videoDisplayWidth = videoRect.width;
      videoDisplayHeight = videoRect.width / videoAspectRatio;
      videoDisplayX = 0;
      videoDisplayY = (videoRect.height - videoDisplayHeight) / 2;
    } else {
      // Video is taller - fit to container height
      videoDisplayHeight = videoRect.height;
      videoDisplayWidth = videoRect.height * videoAspectRatio;
      videoDisplayX = (videoRect.width - videoDisplayWidth) / 2;
      videoDisplayY = 0;
    }

    // Calculate offset for positioning within canvas
    const offsetX = videoDisplayX;
    const offsetY = videoDisplayY;

    // Move to first point
    const firstPoint = points[0];
    ctx.moveTo(
      offsetX + firstPoint.x * videoDisplayWidth,
      offsetY + firstPoint.y * videoDisplayHeight,
    );

    // Draw lines to subsequent points
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      ctx.lineTo(
        offsetX + point.x * videoDisplayWidth,
        offsetY + point.y * videoDisplayHeight,
      );
    }
  } else {
    // Fallback to full canvas coordinates
    const { width, height } = canvas;

    // Move to first point
    const firstPoint = points[0];
    ctx.moveTo(firstPoint.x * width, firstPoint.y * height);

    // Draw lines to subsequent points
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      ctx.lineTo(point.x * width, point.y * height);
    }
  }

  ctx.stroke();
}

export function clearCanvas(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function redrawAllStrokes(
  canvas: HTMLCanvasElement | null,
  strokes: Array<Stroke>,
  videoRef?: React.RefObject<HTMLVideoElement | null>,
) {
  if (!canvas) return;
  strokes.forEach((stroke) => drawStroke(canvas, stroke, videoRef));
}

/** ========================
 *  Canvas Sizing Utilities
 *  ======================== */

export function resizeCanvasToVideo(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  allStrokes: Array<Stroke>,
  videoRef?: React.RefObject<HTMLVideoElement | null>,
) {
  const rect = video.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  // Redraw all strokes after resize
  redrawAllStrokes(canvas, allStrokes, videoRef);
}

export function setupCanvasResize(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  videoRef: React.RefObject<HTMLVideoElement | null>,
  allStrokes: Array<Stroke>,
) {
  const canvas = canvasRef.current;
  const video = videoRef.current;

  if (!canvas || !video) return;

  const resizeCanvas = () => {
    resizeCanvasToVideo(canvas, video, allStrokes, videoRef);
  };

  resizeCanvas();

  const resizeObserver = new ResizeObserver(resizeCanvas);
  resizeObserver.observe(video);

  return () => resizeObserver.disconnect();
}

/** ========================
 *  Message Utilities
 *  ======================== */

export function parseAnnotationMessage(
  payload: Uint8Array,
): AnnotationMessage | null {
  try {
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(payload)) as AnnotationMessage;
  } catch {
    return null;
  }
}

export function encodeAnnotationMessage(
  message: AnnotationMessage,
): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(message));
}

/** ========================
 *  Point Utilities
 *  ======================== */

export function getNormalizedPoint(
  e: React.MouseEvent,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  videoRef?: React.RefObject<HTMLVideoElement | null>,
): Point | null {
  if (!canvasRef.current) return null;

  // If we have a video reference, calculate coordinates relative to the actual video display area
  if (videoRef?.current) {
    const video = videoRef.current;
    const videoRect = video.getBoundingClientRect();
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const containerAspectRatio = videoRect.width / videoRect.height;
    let videoDisplayWidth, videoDisplayHeight, videoDisplayX, videoDisplayY;

    if (videoAspectRatio > containerAspectRatio) {
      // Video is wider than container - letterboxed top/bottom
      videoDisplayWidth = videoRect.width;
      videoDisplayHeight = videoRect.width / videoAspectRatio;
      videoDisplayX = videoRect.left;
      videoDisplayY =
        videoRect.top + (videoRect.height - videoDisplayHeight) / 2;
    } else {
      // Video is taller than container - pillarboxed left/right
      videoDisplayHeight = videoRect.height;
      videoDisplayWidth = videoRect.height * videoAspectRatio;
      videoDisplayX =
        videoRect.left + (videoRect.width - videoDisplayWidth) / 2;
      videoDisplayY = videoRect.top;
    }

    // Check if click is within the actual video display area
    if (
      e.clientX < videoDisplayX ||
      e.clientX > videoDisplayX + videoDisplayWidth ||
      e.clientY < videoDisplayY ||
      e.clientY > videoDisplayY + videoDisplayHeight
    ) {
      return null; // Click is outside video area
    }

    // Calculate normalized coordinates relative to the actual video display area
    return {
      x: (e.clientX - videoDisplayX) / videoDisplayWidth,
      y: (e.clientY - videoDisplayY) / videoDisplayHeight,
    };
  }

  // Fallback to canvas-based coordinates
  const rect = canvasRef.current.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) / rect.width,
    y: (e.clientY - rect.top) / rect.height,
  };
}
