"use client";

import {
  DisconnectButton,
  TrackToggle,
  MediaDeviceMenu,
  usePersistentUserChoices,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { LeaveIcon } from "@livekit/components-react";
import React from "react";

interface CustomerControlBarProps {
  onLeave?: () => Promise<void>;
}

export default function CustomerControlBar({
  onLeave,
}: CustomerControlBarProps) {
  const {
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId,
  } = usePersistentUserChoices({ preventSave: false });

  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);

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
    <div className="lk-control-bar" data-lk-theme="default">
      <div className="lk-button-group">
        <TrackToggle
          source={Track.Source.Microphone}
          showIcon={true}
          onChange={microphoneOnChange}
        >
          Microphone
        </TrackToggle>
        <div className="lk-button-group-menu">
          <MediaDeviceMenu
            kind="audioinput"
            onActiveDeviceChange={(_kind, deviceId) =>
              saveAudioInputDeviceId(deviceId ?? "default")
            }
          />
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
