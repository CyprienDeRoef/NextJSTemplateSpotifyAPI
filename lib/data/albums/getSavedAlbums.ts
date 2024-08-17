"use server";

import { Paging, SavedAlbum } from "@/lib/types";

/**
 * Retrieves the saved albums for a user.
 *
 * @param {string} token - The access token for the user.
 * @param {number} offset - The offset for pagination (default: 0).
 * @param {number} limit - The maximum number of albums to retrieve (default: 50).
 * @param {string} [market] - An optional parameter to specify the market (country) for the albums.
 * @returns {Promise<Paging<SavedAlbum> | undefined>} A promise that resolves to the paging object containing the saved albums, or undefined if an error occurred.
 */
export default async function getSavedAlbums(
  token: string,
  offset: number = 0,
  limit: number = 50,
  market?: string
): Promise<Paging<SavedAlbum> | undefined> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/albums?offset=${offset}&limit=${limit}${
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
