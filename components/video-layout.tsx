"use client";

import { useState } from "react";
import {
  useTracks,
  VideoTrack,
  TrackLoop,
  TrackReferenceOrPlaceholder,
  ParticipantTile,
  ParticipantName,
} from "@livekit/components-react";
import { LocalParticipant, RemoteParticipant, Track } from "livekit-client";
import { cn } from "../utils/merge";
import { CopyIcon } from "@phosphor-icons/react";

interface ResizableVideoLayoutProps {
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

export default function VideoLayout({
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
  const [rightPanelWidth, setRightPanelWidth] = useState(
    DEFAULT_RIGHT_PANEL_WIDTH,
  );
  const [isResizing, setIsResizing] = useState(false);

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
        <SharingControls
          onShareURL={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        />
      </div>

      <div className="flex flex-1 relative">
        {/* Main section */}
        <div
          className="relative bg-black"
          style={{ width: `calc(100% - ${rightPanelWidth}px)` }}
        >
          {!tracks.length ? (
            <div className="flex items-center w-full h-full justify-center bg-black">
              <span className="text-primary-content text-sm">
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
          className={`w-1 bg-gray-700 hover:bg-blue-500 cursor-col-resize transition-colors ${
            isResizing ? "bg-blue-500" : ""
          }`}
          onMouseDown={handleStartResizing}
        />

        {/* Right panel for video tracks */}
        <div
          className="bg-gray-900 flex flex-col p-2 gap-2 overflow-y-auto"
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

function SharingControls({ onShareURL }: { onShareURL: () => void }) {
  return (
    <button
      className="bg-gray-50 rounded-xl h-8 px-3 flex items-center justify-center hover:bg-gray-100 gap-2 cursor-pointer"
      onClick={onShareURL}
    >
      <span className="text-sm text-gray-600">22737-333...</span>
      <CopyIcon size={16} weight="bold" color="var(--color-gray-600)" />
    </button>
  );
}
