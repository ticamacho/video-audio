"use client";

import {
  DisconnectButton,
  TrackToggle,
  MediaDeviceMenu,
  usePersistentUserChoices,
  useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import React from "react";
import {
  CaretDownIcon,
  MicrophoneSlashIcon,
  MicrophoneIcon,
  IconWeight,
  VideoCameraSlashIcon,
  VideoCameraIcon,
  MonitorArrowUpIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { styles } from "../styles";

interface ControlBarProps {
  onLeave?: () => Promise<void>;
}

export default function ControlBar({ onLeave }: ControlBarProps) {
  const component = styles.controlBar;
  const {
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId,
  } = usePersistentUserChoices({ preventSave: false });

  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);
  const { isMicrophoneEnabled, isCameraEnabled } = useLocalParticipant();

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

  const onScreenShareChange = React.useCallback(
    (enabled: boolean) => {
      setIsScreenShareEnabled(enabled);
    },
    [setIsScreenShareEnabled],
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
            onChange={onScreenShareChange}
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
