"use client";

import * as React from "react";
import type { Participant } from "livekit-client";
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
  ParticipantContext,
  TrackRefContext,
  useEnsureTrackRef,
  useFeatureContext,
  useMaybeLayoutContext,
  useMaybeParticipantContext,
  useMaybeTrackRefContext,
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
  LockClosedIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { cn } from "../utils/merge";

/**
 * Context provider that only creates ParticipantContext if needed
 */
function ParticipantContextIfNeeded(
  props: React.PropsWithChildren<{
    participant?: Participant;
  }>,
) {
  const hasContext = !!useMaybeParticipantContext();
  return props.participant && !hasContext ? (
    <ParticipantContext.Provider value={props.participant}>
      {props.children}
    </ParticipantContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

/**
 * Context provider that only creates TrackRefContext if needed
 */
function TrackRefContextIfNeeded(
  props: React.PropsWithChildren<{
    trackRef?: TrackReferenceOrPlaceholder;
  }>,
) {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? (
    <TrackRefContext.Provider value={props.trackRef}>
      {props.children}
    </TrackRefContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

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
  participantNamePosition?:
    | "bottom-left"
    | "bottom-right"
    | "top-left"
    | "top-right";
}

/**
 * CustomParticipantTile - A customizable participant tile component
 *
 * Replicates the structure and functionality of LiveKit's ParticipantTile
 * while providing additional customization options for styling and layout.
 *
 * @example Basic usage:
 * ```tsx
 * <CustomParticipantTile trackRef={trackRef} />
 * ```
 *
 * @example With custom styling:
 * ```tsx
 * <CustomParticipantTile
 *   trackRef={trackRef}
 *   showConnectionQuality={false}
 *   participantNamePosition="top-right"
 * />
 * ```
 */
const ParticipantTile = React.forwardRef<HTMLDivElement, ParticipantTileProps>(
  function ParticipantTile(
    {
      trackRef,
      children,
      onParticipantClick,
      disableSpeakingIndicator = false,
      showConnectionQuality = true,
      showMutedIndicator = true,
      placeholderIcon,
      participantNamePosition = "bottom-left",
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

    // Position classes for participant name
    const getPositionClasses = (position: typeof participantNamePosition) => {
      switch (position) {
        case "bottom-left":
          return "bottom-2 left-2";
        case "bottom-right":
          return "bottom-2 right-2";
        case "top-left":
          return "top-2 left-2";
        case "top-right":
          return "top-2 right-2";
        default:
          return "bottom-2 left-2";
      }
    };

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
              className="w-full h-full object-cover"
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

    const renderParticipantPlaceholder = () => (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
        {placeholderIcon || (
          <UserIcon size={48} className="text-gray-400" weight="light" />
        )}
      </div>
    );

    const renderMetadata = () => (
      <div
        className={cn(
          "absolute flex items-center gap-1 px-2 py-1 bg-black/60 rounded text-white text-sm",
          getPositionClasses(participantNamePosition),
        )}
      >
        {trackReference.source === Track.Source.Camera ? (
          <>
            {isEncrypted && (
              <LockClosedIcon size={12} className="text-yellow-400" />
            )}
            {showMutedIndicator && (
              <TrackMutedIndicator
                trackRef={{
                  participant: trackReference.participant,
                  source: Track.Source.Microphone,
                }}
                show="muted"
              >
                <MicrophoneSlashIcon size={12} className="text-red-400" />
              </TrackMutedIndicator>
            )}
            <ParticipantName className="text-white truncate max-w-20" />
          </>
        ) : (
          <>
            <MonitorArrowUpIcon size={12} className="text-blue-400" />
            <ParticipantName className="text-white truncate max-w-16" />
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
          "relative w-full h-full overflow-hidden rounded-lg",
          className,
        )}
        style={{ position: "relative" }}
        {...elementProps}
      >
        <TrackRefContextIfNeeded trackRef={trackReference}>
          <ParticipantContextIfNeeded participant={trackReference.participant}>
            {children ?? (
              <>
                {renderTrackContent()}
                {renderParticipantPlaceholder()}
                {renderMetadata()}
              </>
            )}
          </ParticipantContextIfNeeded>
        </TrackRefContextIfNeeded>
      </div>
    );
  },
);

export default ParticipantTile;
