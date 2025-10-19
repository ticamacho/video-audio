import { Storage } from "@google-cloud/storage";
import { readFileSync } from "fs";
import { join } from "path";

type GetRecordingFileMetadataOptions = {
  sessionId: string;
};

type GetRecordingFileMetadataResult = {
  fileCount: number;
  sizeBytes: number;
};

export const getRecordingFileMetadata = async (
  options: GetRecordingFileMetadataOptions,
): Promise<GetRecordingFileMetadataResult> => {
  const { sessionId } = options;

  const GCS_BUCKET = process.env.GCS_BUCKET;
  const GCS_CREDENTIALS_PATH = process.env.GCS_CREDENTIALS_PATH
    ? join(process.cwd(), process.env.GCS_CREDENTIALS_PATH)
    : undefined;

  if (!GCS_BUCKET || !GCS_CREDENTIALS_PATH) {
    throw new Error("GCS configuration not found");
  }

  const gcsCredentials = readFileSync(GCS_CREDENTIALS_PATH, "utf-8");
  const credentials = JSON.parse(gcsCredentials);

  const storage = new Storage({ credentials });
  const bucket = storage.bucket(GCS_BUCKET);

  const [files] = await bucket.getFiles({
    prefix: `sessions/${sessionId}/`,
  });

  const mp4Files = files.filter((file) => file.name.endsWith(".mp4"));
  const fileCount = mp4Files.length;
  const sizeBytes = mp4Files.reduce((total, file) => {
    const rawSize = file.metadata.size;
    const size = rawSize
      ? typeof rawSize === "string"
        ? parseInt(rawSize, 10)
        : rawSize
      : 0;
    return total + size;
  }, 0);

  return {
    fileCount,
    sizeBytes,
  };
};

type GenerateDownloadUrlOptions = {
  sessionId: string;
};

type GenerateDownloadUrlResult = {
  url: string;
  expiresAt: Date;
};

/**
 * Generate a signed URL for downloading a recording
 * @param options - Options containing sessionId
 * @returns Signed URL and expiration date
 */
export const generateRecordingDownloadUrl = async (
  options: GenerateDownloadUrlOptions,
): Promise<GenerateDownloadUrlResult> => {
  const { sessionId } = options;

  const GCS_BUCKET = process.env.GCS_BUCKET;
  const GCS_CREDENTIALS_PATH = process.env.GCS_CREDENTIALS_PATH
    ? join(process.cwd(), process.env.GCS_CREDENTIALS_PATH)
    : undefined;

  if (!GCS_BUCKET || !GCS_CREDENTIALS_PATH) {
    throw new Error("GCS configuration not found");
  }

  const gcsCredentials = readFileSync(GCS_CREDENTIALS_PATH, "utf-8");
  const credentials = JSON.parse(gcsCredentials);

  const storage = new Storage({ credentials });
  const bucket = storage.bucket(GCS_BUCKET);

  // Get MP4 files for this session
  const [files] = await bucket.getFiles({
    prefix: `sessions/${sessionId}/`,
  });

  const mp4Files = files.filter((file) => file.name.endsWith(".mp4"));

  if (mp4Files.length === 0) {
    throw new Error("No recording file found for this session");
  }

  // Use the first MP4 file (there should only be one)
  const file = mp4Files[0];

  // Generate signed URL valid for 1 hour
  const expirationMinutes = 60;
  const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

  const [url] = await file.getSignedUrl({
    version: "v4",
    action: "read",
    expires: expiresAt,
    responseDisposition: `attachment; filename="recording-${sessionId}.mp4"`,
  });

  return {
    url,
    expiresAt,
  };
};
