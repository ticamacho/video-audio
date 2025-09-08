"use client";

import { useState } from "react";
import {
  useTracks,
  VideoTrack,
  TrackLoop,
  TrackReferenceOrPlaceholder,
  ParticipantTile,
  ParticipantName,
  useRoomInfo,
} from "@livekit/components-react";
import { LocalParticipant, RemoteParticipant, Track } from "livekit-client";
import { cn } from "../utils/merge";
import { CheckIcon, CopyIcon, IconWeight } from "@phosphor-icons/react";
import { getSharingURL } from "../utils/livekit";
import { styles as componentStyles } from "../styles";

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
  onClearAnnotations?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cameraTrackOptions?: object;
  controlBar: React.ReactNode;
}

const MIN_RIGHT_PANEL_WIDTH = 160;
const MAX_RIGHT_PANEL_WIDTH = 640;
const DEFAULT_RIGHT_PANEL_WIDTH = 320;
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
  onClearAnnotations,
  cameraTrackOptions = {},
  controlBar,
}: ResizableVideoLayoutProps) {
  BASE_URL = baseURL;
  const roomInfo = useRoomInfo();
  const [rightPanelWidth, setRightPanelWidth] = useState(
    DEFAULT_RIGHT_PANEL_WIDTH,
  );
  const [isResizing, setIsResizing] = useState(false);
  const [copiedURL, setCopiedURL] = useState(false);
  const displayText = roomInfo.name ? `${roomInfo.name.slice(0, 8)}...` : "...";
  const styles = componentStyles.video;

  const handleStartResizing = () => setIsResizing(true);
  const handleStopResizing = () => setIsResizing(false);
  const handleResizeMouseMove = (e: React.MouseEvent) => {
    if (!isResizing) return;
    const newWidth = window.innerWidth - e.clientX;
    setRightPanelWidth(
      Math.max(
        MIN_RIGHT_PANEL_WIDTH,
        Math.min(MAX_RIGHT_PANEL_WIDTH, newWidth),
      ),
    );
  };
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
      className="h-screen w-screen flex flex-col p-2 bg-white"
      onMouseMove={handleResizeMouseMove}
      onMouseUp={handleStopResizing}
    >
      {/* Contextual section */}
      <div className="h-14 px-3 flex items-center justify-between">
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

      {/* Main section */}
      <div className="flex flex-1 relative gap-0.5">
        <div
          className="relative bg-black rounded-lg overflow-hidden"
          style={{ width: `calc(100% - ${rightPanelWidth}px)` }}
        >
          {!tracks.length ? (
            <div className="flex items-center w-full h-full justify-center bg-gray-800">
              <span className="text-primary-content">
                No screen is being shared. Customer screen will appear here.
              </span>
            </div>
          ) : (
            <TrackLoop tracks={tracks}>
              <ParticipantTile className="relative w-full h-full">
                <VideoTrack
                  ref={videoRef}
                  className="w-full h-full object-contain"
                />
                <ParticipantName className="badge absolute bottom-0 left-0" />
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

        {/* Resize handle */}
        <div
          className={`w-1 hover:bg-gray-300 cursor-col-resize transition-colors ${
            isResizing ? "bg-gray-300" : ""
          }`}
          onMouseDown={handleStartResizing}
        />

        {/* Right panel for video tracks */}
        <div
          className="bg-gray-800 flex flex-col gap-2 overflow-y-auto rounded-lg p-1"
          style={{ width: `${rightPanelWidth}px` }}
        >
          <ParticipantVideos cameraTrackOptions={cameraTrackOptions} />
        </div>
      </div>

      {/* Bottom control bar */}
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
  const cameraTracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    cameraTrackOptions,
  );

  return (
    <div className="flex flex-col gap-2">
      <TrackLoop tracks={cameraTracks}>
        <ParticipantTile className="w-full aspect-video" />
      </TrackLoop>

      {cameraTracks.length === 0 && (
        <div className="text-gray-50 text-sm text-center py-8">
          No video feeds available
        </div>
      )}
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
