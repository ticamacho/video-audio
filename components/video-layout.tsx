"use client";

import { useState, useEffect } from "react";
import {
  useTracks,
  VideoTrack,
  TrackLoop,
  TrackReferenceOrPlaceholder,
  useRoomInfo,
} from "@livekit/components-react";
import { LocalParticipant, RemoteParticipant, Track } from "livekit-client";
import {
  CheckIcon,
  CopyIcon,
  IconWeight,
  ScreencastIcon,
} from "@phosphor-icons/react";
import { getSharingURL } from "../utils/livekit";
import { calculateElapsedTime } from "../utils/time";
import { styles as componentStyles } from "../styles";
import ParticipantTile from "./participant-tile";
import Indicator from "./indicator";

interface ResizableVideoLayoutProps {
  baseURL: string;
  participants: (RemoteParticipant | LocalParticipant)[];
  tracks: TrackReferenceOrPlaceholder[];
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  headerActions?: React.ReactNode;
  annotate?: boolean;
  connected?: boolean;
  sessionStartTime?: string | Date;
  onCanvasMouseDown?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onCanvasMouseMove?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onCanvasMouseUp?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onCanvasMouseLeave?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  cameraTrackOptions?: object;
  controlBar: React.ReactNode;
}

let BASE_URL: string;

export function VideoLayout({
  baseURL,
  tracks,
  videoRef,
  canvasRef,
  annotate = false,
  connected = false,
  sessionStartTime,
  onCanvasMouseDown,
  onCanvasMouseMove,
  onCanvasMouseUp,
  onCanvasMouseLeave,
  cameraTrackOptions = {},
  controlBar,
}: ResizableVideoLayoutProps) {
  BASE_URL = baseURL;
  const roomInfo = useRoomInfo();
  const [copiedURL, setCopiedURL] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("--:--:--");
  const displayText = roomInfo.name ? `${roomInfo.name.slice(0, 8)}...` : "...";
  const styles = componentStyles.video;

  useEffect(() => {
    if (!sessionStartTime) return;
    const updateElapsedTime = () => {
      const elapsed = calculateElapsedTime(sessionStartTime);
      setElapsedTime(elapsed);
    };
    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);
  const handleShareURL = () => {
    const url = getSharingURL({
      publicURL: BASE_URL,
      roomId: roomInfo.name!,
      customerName: "Customer",
    });
    navigator.clipboard.writeText(url);
    setCopiedURL(true);
    setTimeout(() => setCopiedURL(false), 2000);
  };

  return (
    <div
      data-lk-theme="default"
      className="bg-gray-50 flex h-screen w-screen flex-col gap-0.5 overflow-hidden"
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between bg-white px-6">
        <Indicator isActive={connected} elapsedTime={elapsedTime} />
        <button className={styles.shareContainer} onClick={handleShareURL}>
          <span className="text-sm text-gray-600">{displayText}</span>
          <div className={styles.shareIconContainer}>
            {copiedURL ? (
              <CheckIcon
                size={styles.iconSize}
                weight={styles.iconWeight as IconWeight}
                color={styles.iconColor}
              />
            ) : (
              <CopyIcon
                size={styles.iconSize}
                weight={styles.iconWeight as IconWeight}
                color={styles.iconColor}
              />
            )}
          </div>
        </button>
      </div>

      {/* Participant videos - horizontal row */}
      <div className="flex h-40 w-full items-center justify-center bg-white py-4 md:px-6">
        <ParticipantVideos cameraTrackOptions={cameraTrackOptions} />
      </div>

      {/* Main screen share area */}
      <div className="relative flex-1 overflow-hidden bg-white">
        {!tracks.length ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6">
            <div className="bg-gray-25 flex h-36 w-36 items-center justify-center rounded-full">
              <ScreencastIcon size={56} color={"var(--color-brand-200)"} />
            </div>
            <div className="flex max-w-72 flex-col items-center gap-2 text-center">
              <h2 className="font-semibold text-gray-700">
                Screen share not started
              </h2>
              <p className="text-gray-500">
                No screen is being shared yet. Once it starts, it will appear
                here.
              </p>
            </div>
          </div>
        ) : (
          <TrackLoop tracks={tracks}>
            <ParticipantTile
              className="relative h-full w-full"
              showMutedIndicator={true}
            >
              <VideoTrack
                ref={videoRef}
                className="h-full w-full object-contain"
              />
            </ParticipantTile>
          </TrackLoop>
        )}

        {tracks.length && (
          <canvas
            ref={canvasRef}
            className={
              annotate
                ? "pointer-events-auto absolute inset-0 cursor-crosshair"
                : "pointer-events-none absolute inset-0"
            }
            onMouseDown={onCanvasMouseDown}
            onMouseMove={onCanvasMouseMove}
            onMouseUp={onCanvasMouseUp}
            onMouseLeave={onCanvasMouseLeave}
          />
        )}
      </div>

      {/* Control bar */}
      {controlBar}
    </div>
  );
}

// Participant camera feeds component
function ParticipantVideos({
  cameraTrackOptions = {},
}: {
  cameraTrackOptions?: object;
}) {
  const participantTracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: false },
    ],
    cameraTrackOptions,
  );

  return (
    <div className="flex h-full gap-4 overflow-x-auto">
      <TrackLoop tracks={participantTracks}>
        <ParticipantTile className="aspect-video flex-shrink-0">
          <VideoTrack className="h-full w-full object-cover" />
        </ParticipantTile>
      </TrackLoop>
    </div>
  );
}
