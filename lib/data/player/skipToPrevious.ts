"use server";

/**
 * Skips to the previous track in the user's Spotify player.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} deviceId - (Optional) The ID of the device on which to skip to the previous track.
 * @returns {Promise<void>} A Promise that resolves to void.
 */
export default async function skipToNext(
  token: string,
  deviceId?: string
): Promise<void> {
  try {
    await fetch(
      `https://api.spotify.com/v1/me/player/next${
        deviceId ? `?device_id=${deviceId}` : ""
      }`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}
