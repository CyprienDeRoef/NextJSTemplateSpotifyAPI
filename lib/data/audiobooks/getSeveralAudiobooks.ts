"use server";

import { Audiobook } from "@/lib/types";

/**
 * Retrieves several audiobooks from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string[]} audiobooksIds - The IDs of the audiobooks to retrieve.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<{ audiobooks: Audiobook[] } | undefined>} The retrieved audiobooks.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-multiple-audiobooks
 */
export default async function getSeveralAudiobooks(
  token: string,
  audiobooksIds: string[],
  market?: string
): Promise<
  | {
      audiobooks: Audiobook[];
    }
  | undefined
> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/audiobooks?ids=${audiobooksIds.join(",")}${
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
