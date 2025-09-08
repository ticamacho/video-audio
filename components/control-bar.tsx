"use client";

import {
  DisconnectButton,
  TrackToggle,
  MediaDeviceMenu,
  usePersistentUserChoices,
  useLocalParticipant,
  useRemoteParticipants,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import React, { useMemo } from "react";
import {
  CaretDownIcon,
  MicrophoneSlashIcon,
  MicrophoneIcon,
  IconWeight,
  VideoCameraSlashIcon,
  VideoCameraIcon,
  MonitorArrowUpIcon,
  SignOutIcon,
  PencilSimpleLineIcon,
} from "@phosphor-icons/react";
import { styles as ControlBarStyles } from "../styles";

interface ControlBarProps {
  onLeave?: () => Promise<void>;
  onAnnotationToggle?: () => void;
  isAnnotationEnabled?: boolean;
}

export default function ControlBar({
  onLeave,
  onAnnotationToggle,
  isAnnotationEnabled = false,
}: ControlBarProps) {
  const styles = ControlBarStyles.controlBar;
  const {
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId,
  } = usePersistentUserChoices({ preventSave: false });

  const { isMicrophoneEnabled, isCameraEnabled } = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const screenBeingShared = useMemo(
    () => remoteParticipants.find((p) => p.isScreenShareEnabled),
    [remoteParticipants],
  );

  const microphoneOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveAudioInputEnabled(enabled) : null,
    [saveAudioInputEnabled],
  );

  const cameraOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveVideoInputEnabled(enabled) : null,
    [saveVideoInputEnabled],
  );

  return (
    <div className={styles.controlBar}>
      <div className={styles.controlGroup}>
        {/* Microphone controls */}
        <div className={styles.buttonGroup}>
          <TrackToggle
            source={Track.Source.Microphone}
            onChange={microphoneOnChange}
            showIcon={false}
            className={styles.button}
          >
            {isMicrophoneEnabled ? (
              <MicrophoneIcon
                size={styles.iconSize}
                weight={styles.iconWeight as IconWeight}
                color={styles.iconDefaultColor}
                className={styles.iconInteractivity}
              />
            ) : (
              <MicrophoneSlashIcon
                size={styles.iconSize}
                weight={styles.iconWeight as IconWeight}
                color={styles.iconDefaultColor}
                className={styles.iconInteractivity}
              />
            )}
          </TrackToggle>
          <MediaDeviceMenu
            kind="audioinput"
            onActiveDeviceChange={(_kind, deviceId) =>
              saveAudioInputDeviceId(deviceId ?? "default")
            }
            className={styles.menuButton}
          >
            <CaretDownIcon
              size={styles.iconSize}
              weight={styles.iconWeight as IconWeight}
              color={styles.iconDefaultColor}
              className={styles.iconInteractivity}
            />
          </MediaDeviceMenu>
        </div>

        {/* Camera controls */}
        <div className={styles.buttonGroup}>
          <TrackToggle
            source={Track.Source.Camera}
            showIcon={false}
            onChange={cameraOnChange}
            className={styles.button}
          >
            {isCameraEnabled ? (
              <VideoCameraIcon
                size={styles.iconSize}
                weight={styles.iconWeight as IconWeight}
                color={styles.iconDefaultColor}
                className={styles.iconInteractivity}
              />
            ) : (
              <VideoCameraSlashIcon
                size={styles.iconSize}
                weight={styles.iconWeight as IconWeight}
                color={styles.iconDefaultColor}
                className={styles.iconInteractivity}
              />
            )}
          </TrackToggle>
          <MediaDeviceMenu
            kind="videoinput"
            onActiveDeviceChange={(_kind, deviceId) =>
              saveVideoInputDeviceId(deviceId ?? "default")
            }
            className={styles.menuButton}
          >
            <CaretDownIcon
              size={styles.iconSize}
              weight={styles.iconWeight as IconWeight}
              color={styles.iconDefaultColor}
              className={styles.iconInteractivity}
            />
          </MediaDeviceMenu>
        </div>
      </div>

      {/* Share and annotation controls */}
      <div className={styles.controlGroup}>
        <div className={styles.buttonGroup}>
          <TrackToggle
            source={Track.Source.ScreenShare}
            captureOptions={{ audio: true, selfBrowserSurface: "include" }}
            showIcon={false}
            className={styles.iconButton}
          >
            <MonitorArrowUpIcon
              size={styles.iconSize}
              weight={styles.iconWeight as IconWeight}
              color={styles.iconDefaultColor}
              className={styles.iconInteractivity}
            />
            {/* {isScreenShareEnabled ? "Stop screen share" : "Share screen"} */}
          </TrackToggle>
        </div>

        {onAnnotationToggle && (
          <div className={styles.buttonGroup}>
            <button
              onClick={screenBeingShared ? onAnnotationToggle : undefined}
              className={styles.iconButton}
              data-lk-enabled={isAnnotationEnabled}
              type="button"
            >
              <PencilSimpleLineIcon
                size={styles.iconSize}
                weight={styles.iconWeight as IconWeight}
                color={styles.iconDefaultColor}
                className={styles.iconInteractivity}
              />
            </button>
          </div>
        )}
      </div>

      <div className={styles.leaveGroup}>
        <DisconnectButton onClick={onLeave} className={styles.leaveButton}>
          <SignOutIcon
            size={styles.iconSize}
            weight={styles.iconWeight as IconWeight}
            color={styles.iconDangerColor}
            className={styles.iconInteractivity}
          />
        </DisconnectButton>
      </div>
    </div>
  );
}
