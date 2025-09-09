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
  useFeatureContext,
  useMaybeLayoutContext,
  VideoTrack,
  AudioTrack,
  ParticipantName,
  TrackMutedIndicator,
  ConnectionQualityIndicator,
} from "@livekit/components-react";
import { useParticipantTile } from "@livekit/components-react";
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
  /** The track reference to display */
  trackRef?: TrackReferenceOrPlaceholder;

  /** Disable the speaking indicator */
  disableSpeakingIndicator?: boolean;

  /** Handle participant click events */
  onParticipantClick?: (event: ParticipantClickEvent) => void;

  /** Custom styling options */
  showConnectionQuality?: boolean;
  showMutedIndicator?: boolean;
  placeholderIcon?: React.ReactNode;
}

const ParticipantTile = React.forwardRef<HTMLDivElement, ParticipantTileProps>(
  function ParticipantTile(
    {
      trackRef,
      children,
      onParticipantClick,
      disableSpeakingIndicator = false,
      showConnectionQuality = true,
      showMutedIndicator = true,
      className,
      ...htmlProps
    },
    ref,
  ) {
    const trackReference = useEnsureTrackRef(trackRef);

    const { elementProps } = useParticipantTile<HTMLDivElement>({
      htmlProps,
      disableSpeakingIndicator,
      onParticipantClick,
      trackRef: trackReference,
    });

    const isEncrypted = useIsEncrypted(trackReference.participant);
    const layoutContext = useMaybeLayoutContext();
    const autoManageSubscription = useFeatureContext()?.autoSubscription;

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

    const renderTrackContent = () => {
      if (isTrackReference(trackReference)) {
        const isVideoTrack =
          trackReference.publication?.kind === "video" ||
          trackReference.source === Track.Source.Camera ||
          trackReference.source === Track.Source.ScreenShare;

        if (isVideoTrack) {
          return (
            <VideoTrack
              trackRef={trackReference}
              onSubscriptionStatusChanged={handleSubscribe}
              manageSubscription={autoManageSubscription}
              className="h-full w-full object-cover"
            />
          );
        } else {
          return (
            <AudioTrack
              trackRef={trackReference}
              onSubscriptionStatusChanged={handleSubscribe}
            />
          );
        }
      }
      return null;
    };

    const renderParticipantPlaceholder = () => {
      // Show placeholder when video is not enabled (muted or no track)
      const videoEnabled =
        trackReference.publication && !trackReference.publication.isMuted;

      if (videoEnabled) return null;

      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-gray-100">
          <UserIcon size={44} color={"var(--color-gray-400)"} />
        </div>
      );
    };

    const renderMetadata = () => (
      <div
        className={cn(
          "absolute bottom-0 left-0 flex items-center gap-1 rounded bg-black/60 px-2 text-xs text-white",
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
        {showConnectionQuality && (
          <ConnectionQualityIndicator className="ml-1" />
        )}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-full w-full overflow-hidden rounded-lg",
          className,
        )}
        {...elementProps}
      >
        {children ?? (
          <>
            {renderTrackContent()}
            {renderParticipantPlaceholder()}
            {renderMetadata()}
          </>
        )}
        {/* Always render placeholder and metadata, even when children are provided */}
        {children && (
          <>
            {renderParticipantPlaceholder()}
            {renderMetadata()}
          </>
        )}
      </div>
    );
  },
);

export default ParticipantTile;
