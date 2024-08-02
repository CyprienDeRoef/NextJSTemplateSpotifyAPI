import Playlist from "@/lib/types/Playlist";

export default async function getPlaylist(
  token: string,
  playlistId: string
): Promise<Playlist | undefined> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
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
