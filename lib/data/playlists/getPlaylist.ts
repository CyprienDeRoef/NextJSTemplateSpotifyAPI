"use server";

import { Playlist } from "@/lib/types";

/**
 * Retrieves a playlist from Spotify API.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-playlist
 * @param {string} token - The access token for authentication.
 * @param {string} playlistId - The ID of the playlist to retrieve.
 * @param {string} [market] - The market for which to retrieve the playlist.
 * @returns {Promise<Playlist | undefined>} A promise that resolves to the retrieved playlist, or undefined if an error occurs.
 */
export default async function getPlaylist(
  token: string,
  playlistId: string,
  market?: string
): Promise<Playlist | undefined> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}${
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
