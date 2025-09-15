"use client";

import * as React from "react";
import { Track } from "livekit-client";
import type {
  ParticipantClickEvent,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-core";
import {
  isTrackReference,
  isTrackReferencePinned,
} from "@livekit/components-core";
import {
  useEnsureTrackRef,
  useMaybeLayoutContext,
  AudioTrack,
  ParticipantName,
} from "@livekit/components-react";
import { useIsEncrypted } from "@livekit/components-react";
import {
  MicrophoneSlashIcon,
  MonitorArrowUpIcon,
  LockIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { cn } from "../utils/merge";

export interface ParticipantTileProps
  extends React.HTMLAttributes<HTMLDivElement> {
  trackRef?: TrackReferenceOrPlaceholder;
  disableSpeakingIndicator?: boolean;
  onParticipantClick?: (event: ParticipantClickEvent) => void;
  showMutedIndicator?: boolean;
  placeholderIcon?: React.ReactNode;
}

const ParticipantTile = React.forwardRef<HTMLDivElement, ParticipantTileProps>(
  function ParticipantTile(
    { trackRef, children, showMutedIndicator = true, className, ...htmlProps },
    ref,
  ) {
    const trackReference = useEnsureTrackRef(trackRef);

    // Skip LiveKit's useParticipantTile to avoid conflicting styles
    const elementProps = htmlProps;

    const isEncrypted = useIsEncrypted(trackReference.participant);
    const layoutContext = useMaybeLayoutContext();

    const handleSubscribe = React.useCallback(
      (subscribed: boolean) => {
        if (
          trackReference.source &&
          !subscribed &&
          layoutContext &&
          layoutContext.pin.dispatch &&
          isTrackReferencePinned(trackReference, layoutContext.pin.state)
        ) {
          layoutContext.pin.dispatch({ msg: "clear_pin" });
        }
      },
      [trackReference, layoutContext],
    );

    const isAudioTrack =
      isTrackReference(trackReference) &&
      (trackReference.publication?.kind === "audio" ||
        trackReference.source === Track.Source.Microphone);

    const renderTrackContent = () => {
      // Handle AudioTrack internally, VideoTrack comes as children
      if (isAudioTrack) {
        return (
          <AudioTrack
            trackRef={trackReference}
            onSubscriptionStatusChanged={handleSubscribe}
          />
        );
      }
      return null;
    };

    const renderParticipantPlaceholder = () => {
      // Show placeholder when video is not enabled (muted or no track)
      const videoEnabled =
        trackReference.publication && !trackReference.publication.isMuted;

      if (videoEnabled) return null;

      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-25 border border-gray-50">
          <UserIcon size={48} color={"var(--color-brand-200)"} />
        </div>
      );
    };

    const renderMetadata = () => (
      <div
        className={cn(
          "absolute bottom-0 left-0 flex items-center gap-1 rounded-tr-md bg-black/50 h-5 px-2 text-xs text-white",
        )}
      >
        {trackReference.source === Track.Source.Camera ? (
          <>
            {isEncrypted && <LockIcon size={12} color={"var(--color-white)"} />}
            {showMutedIndicator &&
              !trackReference.participant.isMicrophoneEnabled && (
                <MicrophoneSlashIcon size={12} color={"var(--color-white)"} />
              )}
            <ParticipantName className="max-w-20 truncate" />
          </>
        ) : (
          <>
            <MonitorArrowUpIcon size={12} color={"var(--color-white)"} />
            <ParticipantName className="max-w-16 truncate" />
          </>
        )}
      </div>
    );

    // For audio tracks, render only the audio component without visual elements
    if (isAudioTrack) {
      return renderTrackContent();
    }

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden rounded-lg", className)}
        {...elementProps}
      >
        {/* VideoTrack should be passed as children */}
        {children}

        {/* Internal audio track handling */}
        {renderTrackContent()}

        {/* Only render visual elements for video tracks */}
        {renderParticipantPlaceholder()}
        {renderMetadata()}
      </div>
    );
  },
);

export default ParticipantTile;
