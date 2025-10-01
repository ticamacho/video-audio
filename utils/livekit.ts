import { Room } from "livekit-client";

export async function fetchToken({
  apiURL,
  roomId,
  name,
}: {
  apiURL: string;
  roomId: string;
  name: string;
}) {
  const response = await fetch(
    `${apiURL}/room/${roomId}/participation?name=${encodeURIComponent(name)}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }
  const { token, session } = await response.json();

  return { token, session };
}

type InitSessionParams = {
  apiURL: string;
  metadata?: object;
};
export async function initSession({
  apiURL,
  metadata,
}: InitSessionParams): Promise<{ room: Room }> {
  const response = await fetch(`${apiURL}/room`, {
    method: "POST",
    body: metadata ? JSON.stringify({ metadata }) : null,
  });
  if (!response.ok) {
    throw new Error("Failed to create session");
  }
  return await response.json();
}

export async function endSession(apiURL: string) {
  await fetch(`${apiURL}/room`, {
    method: "PUT",
  });
}

export async function getActiveSession(apiURL: string) {
  const response = await fetch(`${apiURL}/room`);
  if (!response.ok) {
    throw new Error("Failed to fetch active session");
  }
  const { room } = await response.json();
  return room;
}

export async function leaveRoom({
  apiURL,
  roomId,
  name,
}: {
  apiURL: string;
  roomId: string;
  name?: string;
}): Promise<void> {
  const url = name
    ? `${apiURL}/room/${roomId}/participation?name=${encodeURIComponent(name)}`
    : `${apiURL}/room/${roomId}`;
  await fetch(url, {
    method: "PUT",
    keepalive: true,
  });
}

export async function createRoom({
  apiURL,
  roomId,
}: {
  apiURL: string;
  roomId: string;
}) {
  const response = await fetch(`${apiURL}/room/${roomId}`);
  if (!response.ok) {
    throw new Error("Failed to create room");
  }
  const { token, session } = await response.json();

  return { token, session };
}

export function getSharingURL({
  publicURL,
  roomId,
  customerName,
}: {
  publicURL: string;
  roomId: string | undefined;
  customerName: string;
}) {
  if (!roomId) return "";
  return `${publicURL}/share_session?id=${encodeURIComponent(roomId)}&name=${encodeURIComponent(customerName)}`;
}
