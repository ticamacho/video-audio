"use client";

import {
  DisconnectButton,
  TrackToggle,
  MediaDeviceMenu,
  usePersistentUserChoices,
  useLocalParticipant,
  useRemoteParticipants
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
  PencilSimpleLineIcon
} from "@phosphor-icons/react";
import { styles } from "../styles";

interface ControlBarProps {
  onLeave?: () => Promise<void>;
  onAnnotationToggle?: () => void;
  isAnnotationEnabled?: boolean;
}

export default function ControlBar({
  onLeave,
  onAnnotationToggle,
  isAnnotationEnabled = false
}: ControlBarProps) {
  const component = styles.controlBar;
  const {
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId
  } = usePersistentUserChoices({ preventSave: false });

  const { isMicrophoneEnabled, isCameraEnabled } = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const screenBeingShared = useMemo(
    () => remoteParticipants.find((p) => p.isScreenShareEnabled),
    [remoteParticipants]
  );

  const microphoneOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveAudioInputEnabled(enabled) : null,
    [saveAudioInputEnabled]
  );

  const cameraOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveVideoInputEnabled(enabled) : null,
    [saveVideoInputEnabled]
  );

  return (
    <div className={component.controlBar}>
      <div className={component.controlGroup}>
        {/* Microphone controls */}
        <div className={component.buttonGroup}>
          <TrackToggle
            source={Track.Source.Microphone}
            onChange={microphoneOnChange}
            showIcon={false}
            className={component.button}
          >
            {isMicrophoneEnabled ? (
              <MicrophoneIcon
                size={component.iconSize}
                weight={component.iconWeight as IconWeight}
                color={component.iconDefaultColor}
              />
            ) : (
              <MicrophoneSlashIcon
                size={component.iconSize}
                weight={component.iconWeight as IconWeight}
                color={component.iconDefaultColor}
              />
            )}
          </TrackToggle>
          <MediaDeviceMenu
            kind="audioinput"
            onActiveDeviceChange={(_kind, deviceId) =>
              saveAudioInputDeviceId(deviceId ?? "default")
            }
            className={component.menuButton}
          >
            <CaretDownIcon
              size={component.iconSize}
              weight={component.iconWeight as IconWeight}
              color={component.iconDefaultColor}
            />
          </MediaDeviceMenu>
        </div>

        {/* Camera controls */}
        <div className={component.buttonGroup}>
          <TrackToggle
            source={Track.Source.Camera}
            showIcon={false}
            onChange={cameraOnChange}
            className={component.button}
          >
            {isCameraEnabled ? (
              <VideoCameraIcon
                size={component.iconSize}
                weight={component.iconWeight as IconWeight}
                color={component.iconDefaultColor}
              />
            ) : (
              <VideoCameraSlashIcon
                size={component.iconSize}
                weight={component.iconWeight as IconWeight}
                color={component.iconDefaultColor}
              />
            )}
          </TrackToggle>
          <MediaDeviceMenu
            kind="videoinput"
            onActiveDeviceChange={(_kind, deviceId) =>
              saveVideoInputDeviceId(deviceId ?? "default")
            }
            className={component.menuButton}
          >
            <CaretDownIcon
              size={component.iconSize}
              weight={component.iconWeight as IconWeight}
              color={component.iconDefaultColor}
            />
          </MediaDeviceMenu>
        </div>
      </div>

      {/* Share and annotation controls */}
      <div className={component.controlGroup}>
        <div className={component.buttonGroup}>
          <TrackToggle
            source={Track.Source.ScreenShare}
            captureOptions={{ audio: true, selfBrowserSurface: "include" }}
            showIcon={false}
            className={component.iconButton}
          >
            <MonitorArrowUpIcon
              size={component.iconSize}
              weight={component.iconWeight as IconWeight}
              color={component.iconDefaultColor}
            />
            {/* {isScreenShareEnabled ? "Stop screen share" : "Share screen"} */}
          </TrackToggle>
        </div>

        {onAnnotationToggle && (
          <div className={component.buttonGroup}>
            <button
              onClick={screenBeingShared ? onAnnotationToggle : undefined}
              className={component.iconButton}
              data-lk-enabled={isAnnotationEnabled}
              type="button"
            >
              <PencilSimpleLineIcon
                size={component.iconSize}
                weight={component.iconWeight as IconWeight}
                color={component.iconDefaultColor}
              />
            </button>
          </div>
        )}
      </div>

      <div className={component.leaveGroup}>
        <DisconnectButton onClick={onLeave} className={component.leaveButton}>
          <SignOutIcon
            size={component.iconSize}
            weight={component.iconWeight as IconWeight}
            color={component.iconDangerColor}
          />
        </DisconnectButton>
      </div>
    </div>
  );
}
