import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';
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
    console.log('Token scopes:', tokenData.scope || '(no scope returned)');
    if (!tokenData.scope?.includes('user-read-recently-played')) {
      console.warn('⚠ Missing scope: user-read-recently-played. This WILL cause empty arrays.');
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
  }

  // Check currently playing
  const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (nowPlayingRes.status === 204 || nowPlayingRes.status > 400) {
    // Get recently played instead
    const recentResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const recentData = await recentResponse.json();
    console.log('Raw recent data:', recentData);

    if (!recentResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch recently played', details: recentData }, { status: 500 });
    }

    const recentTracks = recentData.items?.map((item: any) => ({
      title: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(', '),
      album: item.track.album.name,
      albumImageUrl: item.track.album.images[0]?.url,
      songUrl: item.track.external_urls.spotify,
      playedAt: item.played_at,
    })) || [];

    return NextResponse.json({ isPlaying: false, recentTracks });
  }

  // If playing, return current song
  const song = await nowPlayingRes.json();
  console.log('Now playing data:', song);

  if (song.is_playing) {
    return NextResponse.json({
      isPlaying: true,
      title: song.item.name,
      artist: song.item.artists.map((artist: any) => artist.name).join(', '),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0]?.url,
      songUrl: song.item.external_urls.spotify,
      progress: song.progress_ms,
      duration: song.item.duration_ms,
    });
  }

  // Fallback: not playing, get recent
  const recentResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const recentData = await recentResponse.json();
  console.log('Raw fallback recent data:', recentData);

  if (!recentResponse.ok) {
    return NextResponse.json({ error: 'Failed to fetch recent tracks', details: recentData }, { status: 500 });
  }

  const recentTracks = recentData.items?.map((item: any) => ({
    title: item.track.name,
    artist: item.track.artists.map((artist: any) => artist.name).join(', '),
    album: item.track.album.name,
    albumImageUrl: item.track.album.images[0]?.url,
    songUrl: item.track.external_urls.spotify,
    playedAt: item.played_at,
  })) || [];

  return NextResponse.json({ isPlaying: false, recentTracks });
}
