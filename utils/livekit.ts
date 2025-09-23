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
