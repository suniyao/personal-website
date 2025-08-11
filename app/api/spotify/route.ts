import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  const json = await response.json();
  if (!response.ok) {
    console.error('Failed to refresh token:', json);
    throw new Error(`Spotify token refresh failed: ${json.error || 'Unknown error'}`);
  }
  return json;
}

export async function GET() {
  let access_token;
  try {
      const tokenData = await getAccessToken();
      access_token = tokenData.access_token;
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
    }

    try {
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (nowPlayingRes.status === 200) {
      const song = await nowPlayingRes.json();
      
      return NextResponse.json({
        isPlaying: song.is_playing,
        title: song.item.name,
        artist: song.item.artists.map((artist: any) => artist.name).join(', '),
        album: song.item.album.name,
        albumImageUrl: song.item.album.images[0]?.url,
        songUrl: song.item.external_urls.spotify,
        progress: song.progress_ms,
        duration: song.item.duration_ms,
      });
    }

    // No current track at all
    return NextResponse.json({ isPlaying: false });
  } catch (err) {
      // On fetch error, treat as not playing
      return NextResponse.json({ isPlaying: false });
  }
}