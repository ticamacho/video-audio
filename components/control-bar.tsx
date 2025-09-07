"use client";

import {
  DisconnectButton,
  TrackToggle,
  MediaDeviceMenu,
  usePersistentUserChoices,
  useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { LeaveIcon } from "@livekit/components-react";
import React from "react";
import {
  CaretDownIcon,
  MicrophoneSlashIcon,
  MicrophoneIcon,
  IconWeight,
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
  const { isMicrophoneEnabled } = useLocalParticipant();

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
              color={component.iconColor}
            />
          ) : (
            <MicrophoneSlashIcon
              size={component.iconSize}
              weight={component.iconWeight as IconWeight}
              color={component.iconColor}
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
            color={component.iconColor}
          />
        </MediaDeviceMenu>
      </div>

      <div className={component.buttonGroup}>
        <TrackToggle
          source={Track.Source.Camera}
          showIcon={true}
          onChange={cameraOnChange}
        >
          Camera
        </TrackToggle>
        <div className="lk-button-group-menu">
          <MediaDeviceMenu
            kind="videoinput"
            onActiveDeviceChange={(_kind, deviceId) =>
              saveVideoInputDeviceId(deviceId ?? "default")
            }
          />
        </div>
      </div>

      <TrackToggle
        source={Track.Source.ScreenShare}
        captureOptions={{ audio: true, selfBrowserSurface: "include" }}
        showIcon={true}
        onChange={onScreenShareChange}
      >
        {isScreenShareEnabled ? "Stop screen share" : "Share screen"}
      </TrackToggle>

      <DisconnectButton onClick={onLeave}>
        <LeaveIcon />
        Leave
      </DisconnectButton>
    </div>
  );
}
