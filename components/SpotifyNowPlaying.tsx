'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
  playedAt?: string; // Add this field
  timestamp?: string;
  artistsUrl?: string; // Add this field
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<NowPlayingData>({ isPlaying: false });
  const [lastKnownTrack, setLastKnownTrack] = useState<NowPlayingData | null>(null);
  const [progress, setProgress] = useState(0);

  // Helper to format "x mins ago"
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };


  useEffect(() => {
    // Load cached track from localStorage on mount
    const cached = localStorage.getItem('lastSpotifyTrack');
    if (cached) {
      const parsed = JSON.parse(cached);
      console.log('Loaded lastKnownTrack from localStorage:', parsed); // Debug loaded value
      setLastKnownTrack(parsed);
    }
  }, []);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (!response.ok) {
          setData({ isPlaying: false });
          return;
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          setData({ isPlaying: false });
          return;
        }
        const newData = await response.json();
        setData(newData);

        // If we got track data (playing or paused), cache it with playedAt timestamp
        if (newData.title) {
          let cachedTrack: NowPlayingData;
          if (newData.isPlaying) {
            // If playing, update playedAt to now
            cachedTrack = { ...newData};
          } else if (lastKnownTrack && lastKnownTrack.title === newData.title) {
            // If paused or not playing, keep previous playedAt if same song
            cachedTrack = { ...newData, playedAt: new Date(newData.timestamp).toISOString()};
          } else {
            // If new song, but not playing (edge case), set playedAt to now
            cachedTrack = { ...newData, playedAt: new Date(newData.timestamp).toISOString() };
          }
          console.log('Caching lastKnownTrack:', cachedTrack); // Debug cached value
          setLastKnownTrack(cachedTrack);
          localStorage.setItem('lastSpotifyTrack', JSON.stringify(cachedTrack));
        }
        if (newData.progress) {
          setProgress(newData.progress);
        }
      } catch {
        setData({ isPlaying: false });
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!data.isPlaying) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (data.duration && prev < data.duration) {
          return prev + 1000;
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [data.isPlaying, data.duration]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = data.duration ? (progress / data.duration) * 100 : 0;

  // If currently playing, show current track
  if (data.isPlaying) {
    return (
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
          <span className="text-sm font-light">Currently listening to</span>
        </div>
       <div
          className="flex items-center gap-3 p-4 rounded-2xl backdrop-blur-md bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300 shadow-xl group"
        >
          {data.albumImageUrl && (
            <div className="relative" style={{ width: 56, minWidth: 56, height: 56 }}>
              <Image
                src={data.albumImageUrl}
                alt={data.album || ''}
                width={56}
                height={56}
                className="rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent to-black/20" />
            </div>
          )}
          <div className="flex flex-col w-80">
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold truncate text-gray-800 dark:text-gray-100 hover:underline"
            >
              {data.title}
            </a>
            <a
              href={data.artistsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs truncate text-gray-600 dark:text-gray-400 hover:underline max-w-md"
            >
              {data.artist}
            </a>
            {/* progress bar */}
            <div className="">
              <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-mono">{formatTime(progress)}</span>
                <div className="flex-1 relative h-1.5 bg-white/20 dark:bg-gray-700/30 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  <div 
                    className="relative h-full bg-gradient-to-r from-gray-500 to-gray-300 rounded-full shadow-sm transition-all duration-1000 ease-linear"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="font-mono">{data.duration ? formatTime(data.duration) : '0:00'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If not playing but we have a cached track, show that
  if (!data.isPlaying && lastKnownTrack) {
    return (
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
          <span className="text-sm font-light">
            Last played {lastKnownTrack.playedAt ? formatTimeAgo(lastKnownTrack.playedAt) : ''}
          </span>
        </div>
        <div
          className="flex items-center gap-3 p-4 rounded-2xl backdrop-blur-md bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300 shadow-lg"
        >
          {lastKnownTrack.albumImageUrl && (
            <div className="relative" style={{ width: 56, minWidth: 56, height: 56 }}>
              <Image
                src={lastKnownTrack.albumImageUrl}
                alt={lastKnownTrack.album || ''}
                width={56}
                height={56}
                className="rounded-lg shadow-md opacity-75"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent to-black/20" />
            </div>
          )}
          <div className="flex flex-col w-80">
            <a href={lastKnownTrack.songUrl} target='_blank' rel='noopener noreferrer' className="text-sm font-medium truncate text-gray-800 dark:text-gray-200 hover:underline">{lastKnownTrack.title}</a>
            <a href={lastKnownTrack.artistsUrl} target="_blank" rel="noopener noreferrer" className="text-xs truncate text-gray-600 dark:text-gray-400 hover:underline">{lastKnownTrack.artist}</a>
          </div>
        </div>
      </div>
    );
  }

  // No data at all
  return (
    <div className="flex items-center gap-2 text-gray-500 backdrop-blur-sm bg-white/5 dark:bg-gray-900/10 px-4 py-2 rounded-full border border-white/10 dark:border-gray-700/20">
      <span className="text-sm font-light">Not playing</span>
    </div>
  );
}