" use server";

import { CurrentlyPlayingContext } from "@/lib/types";

/**
 * Retrieves the playback state from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} [market] - The market for which to retrieve the playback state (optional).
 * @returns {Promise<CurrentlyPlayingContext | undefined>} - The currently playing context or undefined if an error occurs.
 */
export default async function getPlaybackState(
  token: string,
  market?: string
): Promise<CurrentlyPlayingContext | undefined> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/player${
        market ? `?market=${market}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
