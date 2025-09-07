"use client";

import {
  DisconnectButton,
  TrackToggle,
  MediaDeviceMenu,
  usePersistentUserChoices
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { LeaveIcon } from "@livekit/components-react";
import React from "react";
import { CaretDownIcon, MicrophoneIcon } from "@phosphor-icons/react";

interface ControlBarProps {
  onLeave?: () => Promise<void>;
}

export default function ControlBar({ onLeave }: ControlBarProps) {
  const {
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId
  } = usePersistentUserChoices({ preventSave: false });

  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);

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

  const onScreenShareChange = React.useCallback(
    (enabled: boolean) => {
      setIsScreenShareEnabled(enabled);
    },
    [setIsScreenShareEnabled]
  );

  return (
    <div className="lk-control-bar" data-lk-theme="default">
      {/* <div className="lk-button-group"> */}
      <div className="flex h-11 flex-col rounded-2xl border-2 border-gray-400 px-3 text-gray-400">
        <TrackToggle
          source={Track.Source.Microphone}
          onChange={microphoneOnChange}
          className="h-100 bg-gray-50 pr-3 pl-4"
        >
          <MicrophoneIcon
            color="var(--color-gray-400)"
            size={20}
            weight="bold"
          />
        </TrackToggle>
        <div className="lk-button-group-menu">
          <MediaDeviceMenu
            kind="audioinput"
            onActiveDeviceChange={(_kind, deviceId) =>
              saveAudioInputDeviceId(deviceId ?? "default")
            }
          >
            <CaretDownIcon
              size={20}
              weight="bold"
              color="var(--color-gray-400)"
            />
          </MediaDeviceMenu>
        </div>
      </div>

      <div className="lk-button-group">
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
