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
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<NowPlayingData>({ isPlaying: false });
  const [lastKnownTrack, setLastKnownTrack] = useState<NowPlayingData | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load cached track from localStorage on mount
    const cached = localStorage.getItem('lastSpotifyTrack');
    if (cached) {
      setLastKnownTrack(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify');
        
        if (!response.ok) {
          console.error('Spotify API error:', response.status, response.statusText);
          setData({ isPlaying: false });
          return;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Response is not JSON');
          setData({ isPlaying: false });
          return;
        }

        const newData = await response.json();
        setData(newData);
        
        // If we got track data (playing or paused), cache it
        if (newData.title) {
          setLastKnownTrack(newData);
          localStorage.setItem('lastSpotifyTrack', JSON.stringify(newData));
        }
        
        if (newData.progress) {
          setProgress(newData.progress);
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
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
        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-2xl backdrop-blur-md bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300 shadow-xl group"
        >
          {data.albumImageUrl && (
            <div className="relative">
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
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-gray-800 dark:text-gray-100">{data.title}</p>
            <p className="text-xs truncate text-gray-600 dark:text-gray-400">{data.artist}</p>
            <div className="mt-3 px-4">
              <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-mono">{formatTime(progress)}</span>
                <div className="flex-1 relative h-1.5 bg-white/20 dark:bg-gray-700/30 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  <div 
                    className="relative h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-sm transition-all duration-1000 ease-linear"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="font-mono">{data.duration ? formatTime(data.duration) : '0:00'}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }

  // If not playing but we have a cached track, show that
  if (!data.isPlaying && lastKnownTrack) {
    return (
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
          <span className="text-sm font-light">Last played</span>
        </div>
        <a
          href={lastKnownTrack.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-2xl backdrop-blur-md bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300 shadow-lg"
        >
          {lastKnownTrack.albumImageUrl && (
            <div className="relative">
              <Image
                src={lastKnownTrack.albumImageUrl}
                alt={lastKnownTrack.album || ''}
                width={48}
                height={48}
                className="rounded-lg shadow-md opacity-75"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent to-black/20" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-gray-800 dark:text-gray-200">{lastKnownTrack.title}</p>
            <p className="text-xs truncate text-gray-600 dark:text-gray-400">{lastKnownTrack.artist}</p>
          </div>
        </a>
      </div>
    );
  }

  // No data at all
  return (
    <div className="flex items-center gap-2 text-gray-500 backdrop-blur-sm bg-white/5 dark:bg-gray-900/10 px-4 py-2 rounded-full border border-white/10 dark:border-gray-700/20">
      <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
      <span className="text-sm font-light">Not playing</span>
    </div>
  );
}