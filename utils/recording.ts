import {
  EgressClient,
  EncodedFileType,
  EncodedFileOutput,
  GCPUpload,
} from "livekit-server-sdk";
import { readFileSync } from "fs";
import { join } from "path";

type StartRecordingOptions = {
  roomName: string;
  sessionId: string;
};

type StartRecordingResult = {
  egressId: string;
  recordingStarted: boolean;
  recordingUrl: string;
  filepath: string;
};

const constructGCSUrl = (bucket: string, filepath: string): string => {
  return `gs://${bucket}/${filepath}`;
};

export const startRoomRecording = async (
  options: StartRecordingOptions,
): Promise<StartRecordingResult> => {
  const { roomName, sessionId } = options;

  const WS_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const API_KEY = process.env.LIVEKIT_API_KEY;
  const API_SECRET = process.env.LIVEKIT_API_SECRET;
  const GCS_BUCKET = process.env.GCS_BUCKET;
  const GCS_CREDENTIALS_PATH = process.env.GCS_CREDENTIALS_PATH
    ? join(process.cwd(), process.env.GCS_CREDENTIALS_PATH)
    : undefined;

  if (!WS_URL || !API_KEY || !API_SECRET) {
    throw new Error("LiveKit credentials not configured");
  }

  if (!GCS_BUCKET || !GCS_CREDENTIALS_PATH) {
    throw new Error("GCS configuration not found");
  }

  const egressClient = new EgressClient(WS_URL, API_KEY, API_SECRET);

  const gcsCredentials = readFileSync(GCS_CREDENTIALS_PATH, "utf-8");

  const gcpUpload = new GCPUpload({
    credentials: gcsCredentials,
    bucket: GCS_BUCKET,
  });

  const filepath = `sessions/${sessionId}/{time}.mp4`;

  const fileOutput = new EncodedFileOutput({
    fileType: EncodedFileType.MP4,
    filepath,
    output: {
      case: "gcp",
      value: gcpUpload,
    },
  });

  const egress = await egressClient.startRoomCompositeEgress(
    roomName,
    fileOutput,
    {
      audioOnly: false,
    },
  );

  if (!egress.egressId) {
    throw new Error("Failed to start recording - no egress ID returned");
  }

  const recordingUrl = constructGCSUrl(GCS_BUCKET, filepath);

  return {
    egressId: egress.egressId,
    recordingStarted: true,
    recordingUrl,
    filepath,
  };
};

type StopRecordingOptions = {
  egressId: string;
};

type StopRecordingResult = {
  recordingStopped: boolean;
};

export const stopRoomRecording = async (
  options: StopRecordingOptions,
): Promise<StopRecordingResult> => {
  const { egressId } = options;

  const WS_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const API_KEY = process.env.LIVEKIT_API_KEY;
  const API_SECRET = process.env.LIVEKIT_API_SECRET;

  if (!WS_URL || !API_KEY || !API_SECRET) {
    throw new Error("LiveKit credentials not configured");
  }

  const egressClient = new EgressClient(WS_URL, API_KEY, API_SECRET);

  await egressClient.stopEgress(egressId);

  return {
    recordingStopped: true,
  };
};

type GetRecordingStatusOptions = {
  egressId: string;
};

export const getRecordingStatus = async (
  options: GetRecordingStatusOptions,
) => {
  const { egressId } = options;

  const WS_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const API_KEY = process.env.LIVEKIT_API_KEY;
  const API_SECRET = process.env.LIVEKIT_API_SECRET;

  if (!WS_URL || !API_KEY || !API_SECRET) {
    throw new Error("LiveKit credentials not configured");
  }

  const egressClient = new EgressClient(WS_URL, API_KEY, API_SECRET);

  const egress = await egressClient.listEgress({ egressId });

  if (!egress || egress.length === 0) {
    throw new Error("Recording not found");
  }

  return egress[0];
};
