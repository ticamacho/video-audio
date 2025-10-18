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
