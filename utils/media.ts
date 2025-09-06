import { DEVICE_PERMISSION_STATE } from "../types";

export interface PermissionStates {
  video: DEVICE_PERMISSION_STATE;
  audio: DEVICE_PERMISSION_STATE;
}

// Returns a media stream with audio and video tracks
export async function getUserMedia() {
  return await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
}

// Test for permission for device access
export async function mediaPermissions(): Promise<{
  video: PermissionStatus;
  audio: PermissionStatus;
} | null> {
  try {
    const video = await navigator.permissions.query({ name: "camera" });
    const audio = await navigator.permissions.query({ name: "microphone" });
    return { video, audio };
  } catch (error) {
    console.error("Error checking permissions:", error);
    return null;
  }
}

const mapPermissionState = (
  state?: PermissionState,
): DEVICE_PERMISSION_STATE => {
  switch (state) {
    case "granted":
      return DEVICE_PERMISSION_STATE.GRANTED;
    case "denied":
      return DEVICE_PERMISSION_STATE.DECLINED;
    default:
      return DEVICE_PERMISSION_STATE.REQUIRED;
  }
};

// Check if permissions are blocked at OS level
async function detectOSBlocking(): Promise<{
  video: boolean;
  audio: boolean;
}> {
  const permissions = await mediaPermissions();

  if (!permissions) {
    return { video: false, audio: false };
  }

  // If browser says granted, test actual access
  const browserGranted =
    permissions.video.state === "granted" &&
    permissions.audio.state === "granted";

  if (!browserGranted) {
    return { video: false, audio: false };
  }

  try {
    const stream = await getUserMedia();
    stream.getTracks().forEach((track) => track.stop());
    return { video: false, audio: false }; // Access successful
  } catch (error: unknown) {
    // Browser granted but getUserMedia failed = OS level blocking
    if ((error as { name: string }).name === "NotAllowedError") {
      return { video: true, audio: true };
    }
    return { video: false, audio: false };
  }
}

export async function getDevicesPermissionState(): Promise<PermissionStates> {
  const permissions = await mediaPermissions();

  if (!permissions) {
    return {
      video: DEVICE_PERMISSION_STATE.REQUIRED,
      audio: DEVICE_PERMISSION_STATE.REQUIRED,
    };
  }

  // Get basic permission states
  let videoState = mapPermissionState(permissions.video.state);
  let audioState = mapPermissionState(permissions.audio.state);

  // If browser permissions are granted, check for OS-level blocking
  if (
    videoState === DEVICE_PERMISSION_STATE.GRANTED ||
    audioState === DEVICE_PERMISSION_STATE.GRANTED
  ) {
    const osBlocking = await detectOSBlocking();

    if (osBlocking.video && videoState === DEVICE_PERMISSION_STATE.GRANTED) {
      videoState = DEVICE_PERMISSION_STATE.OS_BLOCKED;
    }
    if (osBlocking.audio && audioState === DEVICE_PERMISSION_STATE.GRANTED) {
      audioState = DEVICE_PERMISSION_STATE.OS_BLOCKED;
    }
  }

  return {
    video: videoState,
    audio: audioState,
  };
}

// Simple permission monitoring
export async function watchPermissions(
  callback: (permissions: PermissionStates) => void,
) {
  const permissions = await mediaPermissions();
  if (!permissions) {
    console.error("Permission monitoring failed");
    return null;
  }

  const handleChange = async () => {
    // Use the enhanced state detection that includes OS-level checks
    const state = await getDevicesPermissionState();
    callback(state);
  };

  permissions.video.addEventListener("change", handleChange);
  permissions.audio.addEventListener("change", handleChange);

  // Initial call
  handleChange();

  // Return cleanup function
  return () => {
    permissions.video.removeEventListener("change", handleChange);
    permissions.audio.removeEventListener("change", handleChange);
  };
}
