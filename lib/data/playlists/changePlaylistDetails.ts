"use server";

/**
 * Changes the details of a playlist.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} playlistId - The ID of the playlist to be modified.
 * @param {string} [name] - Optional. The new name for the playlist.
 * @param {string} [description] - Optional. The new description for the playlist.
 * @param {boolean} [isPublic] - Optional. Indicates whether the playlist should be public or not.
 * @param {boolean} [isCollaborative] - Optional. Indicates whether the playlist should be collaborative or not.
 * @returns {Promise<void>} - A promise that resolves when the playlist details are successfully changed.
 */
export default async function changePlaylistDetails(
  token: string,
  playlistId: string,
  name?: string,
  description?: string,
  isPublic?: boolean,
  isCollaborative?: boolean
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          public: isPublic,
          collaborative: isCollaborative,
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
