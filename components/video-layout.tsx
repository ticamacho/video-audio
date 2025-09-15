"use client";

import { useState } from "react";
import {
  useTracks,
  VideoTrack,
  TrackLoop,
  TrackReferenceOrPlaceholder,
  useRoomInfo,
} from "@livekit/components-react";
import { LocalParticipant, RemoteParticipant, Track } from "livekit-client";
import { cn } from "../utils/merge";
import {
  CheckIcon,
  CopyIcon,
  IconWeight,
  ScreencastIcon,
} from "@phosphor-icons/react";
import { getSharingURL } from "../utils/livekit";
import { styles as componentStyles } from "../styles";
import ParticipantTile from "./participant-tile";

interface ResizableVideoLayoutProps {
  baseURL: string;
  participants: (RemoteParticipant | LocalParticipant)[];
  tracks: TrackReferenceOrPlaceholder[];
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  headerActions?: React.ReactNode;
  annotate?: boolean;
  onCanvasMouseDown?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onCanvasMouseMove?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onCanvasMouseUp?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onCanvasMouseLeave?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  cameraTrackOptions?: object;
  controlBar: React.ReactNode;
}

let BASE_URL: string;

export default function VideoLayout({
  baseURL,
  tracks,
  videoRef,
  canvasRef,
  annotate = false,
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
  const displayText = roomInfo.name ? `${roomInfo.name.slice(0, 8)}...` : "...";
  const styles = componentStyles.video;
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
      className="h-screen w-screen flex flex-col gap-0.5 overflow-hidden bg-gray-25"
    >
      {/* Header */}
      <div className="h-14 px-6 flex items-center justify-between bg-white">
        <LiveIndicator elapsedTime="11:00" isLive={true} />
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
      <div className="h-40 py-4 bg-white md:px-6 flex items-center justify-center w-full">
        <ParticipantVideos cameraTrackOptions={cameraTrackOptions} />
      </div>

      {/* Main screen share area */}
      <div className="relative overflow-hidden flex-1 bg-white">
        {!tracks.length ? (
          <div className="flex flex-col gap-6 items-center w-full h-full justify-center">
            <div className="w-36 h-36 rounded-full bg-gray-25 flex items-center justify-center">
              <ScreencastIcon size={56} color={"var(--color-brand-200)"} />
            </div>
            <div className="flex flex-col gap-2 items-center text-center max-w-72">
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
              className="relative w-full h-full"
              showMutedIndicator={true}
            >
              <VideoTrack
                ref={videoRef}
                className="w-full h-full object-contain"
              />
            </ParticipantTile>
          </TrackLoop>
        )}

        {tracks.length && (
          <canvas
            ref={canvasRef}
            className={
              annotate
                ? "absolute inset-0 pointer-events-auto cursor-crosshair"
                : "absolute inset-0 pointer-events-none"
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
    <div className="flex gap-4 overflow-x-auto h-full">
      <TrackLoop tracks={participantTracks}>
        <ParticipantTile className="aspect-video flex-shrink-0">
          <VideoTrack className="object-cover w-full h-full" />
        </ParticipantTile>
      </TrackLoop>
    </div>
  );
}

function LiveIndicator({
  isLive,
  elapsedTime = "--:--:--",
}: {
  isLive: boolean;
  elapsedTime: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-4 h-4 rounded-full flex items-center justify-center",
          isLive ? "bg-brand-300" : "bg-red-200",
        )}
      >
        <div
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            isLive ? "bg-brand-700" : "bg-red-700",
          )}
        />
      </div>
      <span className="text-sm text-gray-600">
        {isLive ? elapsedTime : "Not Connected"}
      </span>
    </div>
  );
}
