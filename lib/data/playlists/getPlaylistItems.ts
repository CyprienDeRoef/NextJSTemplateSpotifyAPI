"use server";

import { Paging, PlaylistTrack } from "@/lib/types";

/**
 * Retrieves the items of a playlist from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} playlistId - The ID of the playlist.
 * @param {number} offset - The offset for pagination (default: 0).
 * @param {number} limit - The maximum number of items to retrieve (default: 50).
 * @param {string} market - An optional market parameter for track availability.
 * @returns {Promise<Paging<PlaylistTrack> | undefined>} A promise that resolves to a Paging object containing the playlist items, or undefined if an error occurs.
 */
export default async function getPlaylistItems(
  token: string,
  playlistId: string,
  offset: number = 0,
  limit: number = 50,
  market?: string
): Promise<Paging<PlaylistTrack> | undefined> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}${
        market ? `&market=${market}` : ""
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
