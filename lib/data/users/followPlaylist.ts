"use server";

/**
 * Follows a playlist on Spotify.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} playlistId - The ID of the playlist to follow.
 * @param {boolean} [isPublic=true] - Optional. Indicates whether the playlist should be made public or not.
 * @returns {Promise<void>} - A promise that resolves when the playlist is successfully followed.
 */
export default async function followPlaylist(
  token: string,
  playlistId: string,
  isPublic: boolean = true
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify({
          public: isPublic,
        }),
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
