import { SimplifiedPlaylist } from "@/lib/types/Playlist";

export default async function getCurrentUserPlaylists(token: string): Promise<
  | {
      href: string;
      items: SimplifiedPlaylist[];
      limite: number;
      next: string;
      offset: number;
      previous: string;
      total: number;
    }
  | undefined
> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/playlists`,
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
