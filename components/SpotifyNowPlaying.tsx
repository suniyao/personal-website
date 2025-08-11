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

interface RecentTrack {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  playedAt: string;
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<NowPlayingData>({ isPlaying: false });
  const [recentTracks, setRecentTracks] = useState<RecentTrack[]>([]);
  const [progress, setProgress] = useState(0);

useEffect(() => {
  const fetchNowPlaying = async () => {
    try {
      const response = await fetch('/api/spotify');
      
      // Check if response is ok
      if (!response.ok) {
        console.error('Spotify API error:', response.status, response.statusText);
        setData({ isPlaying: false });
        return;
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON');
        setData({ isPlaying: false });
        return;
      }

      const newData = await response.json();
      console.log('Spotify data:', newData); // Add this debug line
      setData(newData);
      
      if (newData.progress) {
        setProgress(newData.progress);
      }
      if (newData.recentTracks) {
        console.log('Recent tracks:', newData.recentTracks); // Add this debug line
        setRecentTracks(newData.recentTracks);
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const progressPercentage = data.duration ? (progress / data.duration) * 100 : 0;

  if (!data.isPlaying && recentTracks.length > 0) {
    return (
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className="text-sm">Recently played</span>
        </div>
        <a
          href={recentTracks[0].songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {recentTracks[0].albumImageUrl && (
            <Image
              src={recentTracks[0].albumImageUrl}
              alt={recentTracks[0].album || ''}
              width={48}
              height={48}
              className="rounded opacity-75"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-gray-700 dark:text-gray-300">{recentTracks[0].title}</p>
            <p className="text-xs text-gray-500 truncate">{recentTracks[0].artist}</p>
          </div>
          <span className="text-xs text-gray-400">{formatTimeAgo(recentTracks[0].playedAt)}</span>
        </a>
      </div>
    );
  }

  if (!data.isPlaying) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span className="text-sm">Not playing</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        {data.albumImageUrl && (
          <Image
            src={data.albumImageUrl}
            alt={data.album || ''}
            width={48}
            height={48}
            className="rounded"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{data.title}</p>
          <p className="text-xs text-gray-500 truncate">{data.artist}</p>
        </div>
        <svg className="w-5 h-5 text-green-500 flex-shrink-0 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </a>
      <div className="mt-2 px-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{formatTime(progress)}</span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span>{data.duration ? formatTime(data.duration) : '0:00'}</span>
        </div>
      </div>
    </div>
  );
}