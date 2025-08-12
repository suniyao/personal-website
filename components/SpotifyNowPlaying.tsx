'use client'

import { useEffect, useState, useRef } from 'react';
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
  playedAt?: string;
  timestamp?: string;
  artistsUrl?: string;
}

export default function SpotifyNowPlaying() {
  const [currentTrack, setCurrentTrack] = useState<NowPlayingData>({ isPlaying: false });
  const [progress, setProgress] = useState(0);
  const [dominantColorLeft, setDominantColorLeft] = useState<string>('rgba(255,255,255,0.05)');
  const [dominantColorRight, setDominantColorRight] = useState<string>('rgba(255,255,255,0.05)');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Extract dominant color from album cover
  const extractDominantColor = (imageUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);
      
      try {
        const imageData = ctx.getImageData(0, 0, 50, 50);
        const data = imageData.data;
        
        let r = 0, g = 0, b = 0;
        let pixelCount = 0;
        
        // Sample every few pixels to get average color
        for (let i = 0; i < data.length; i += 16) { // Skip pixels for performance
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          pixelCount++;
        }
        
        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);
        
        // Create a more vibrant but subtle color
        const enhancedR = Math.min(255, Math.floor(r * 1.2));
        const enhancedG = Math.min(255, Math.floor(g * 1.2));
        const enhancedB = Math.min(255, Math.floor(b * 1.2));
        
        setDominantColorLeft(`rgba(${enhancedR}, ${enhancedG}, ${enhancedB}, 0.15)`);
        setDominantColorRight(`rgba(${enhancedR}, ${enhancedG}, ${enhancedB}, 0.2)`);
      } catch (error) {
        console.log('Could not extract color, using fallback');
        setDominantColorLeft('rgba(255,255,255,0.05)');
        setDominantColorRight('rgba(255,255,255,0.08)');
      }
    };
    
    img.onerror = () => {
      setDominantColorLeft('rgba(255,255,255,0.05)');
      setDominantColorRight('rgba(255,255,255,0.08)');
    };
    
    img.src = imageUrl;
  };
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
    // Load cached track on mount
    const cached = localStorage.getItem('lastSpotifyTrack');
    if (cached) {
      const parsed = JSON.parse(cached);
      setCurrentTrack(parsed);
      // Extract color from cached album cover
      if (parsed.albumImageUrl) {
        extractDominantColor(parsed.albumImageUrl);
      }
    }
  }, []);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (!response.ok) return;
        
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) return;
        
        const newData = await response.json();
        
        // Always update current track if we have song data
        if (newData.title) {
          const trackWithTimestamp = {
            ...newData,
            playedAt: newData.isPlaying 
              ? new Date().toISOString() 
              : new Date(newData.timestamp).toISOString()
          };
          
          setCurrentTrack(trackWithTimestamp);
          localStorage.setItem('lastSpotifyTrack', JSON.stringify(trackWithTimestamp));
          
          // Extract color from new album cover
          if (newData.albumImageUrl && newData.albumImageUrl !== currentTrack.albumImageUrl) {
            extractDominantColor(newData.albumImageUrl);
          }
          
          if (newData.progress) {
            setProgress(newData.progress);
          }
        } else {
          // No song data, just update playing status
          setCurrentTrack(prev => ({ ...prev, isPlaying: false }));
        }
      } catch (error) {
        console.error('Spotify fetch error:', error);
      }
    };

    fetchNowPlaying();
    // More frequent polling for better responsiveness
    const interval = setInterval(fetchNowPlaying, 2000);
    return () => clearInterval(interval);
  }, []);

  // Progress timer for currently playing tracks
  useEffect(() => {
    if (!currentTrack.isPlaying) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (currentTrack.duration && prev < currentTrack.duration) {
          return prev + 1000;
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentTrack.isPlaying, currentTrack.duration]);

  const progressPercentage = currentTrack.duration ? (progress / currentTrack.duration) * 100 : 0;

  // No track data at all
  if (!currentTrack.title) {
    return (
      <div className="flex items-center gap-2 text-gray-500 backdrop-blur-sm bg-white/5 dark:bg-gray-900/10 px-4 py-2 rounded-full border border-white/10 dark:border-gray-700/20">
        <span className="text-sm font-light">Not playing</span>
      </div>
    );
  }

  // Single unified component for both playing and paused states
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
        <span className="text-sm font-light">
          {currentTrack.isPlaying 
            ? 'Currently listening to' 
            : `Last played ${currentTrack.playedAt ? formatTimeAgo(currentTrack.playedAt) : ''}`
          }
        </span>
      </div>
      
      <div 
        className="rounded-2xl backdrop-blur-md bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300 shadow-xl group w-105 relative overflow-hidden"
        style={{
          background: currentTrack.isPlaying ? `linear-gradient(to right, 
            ${dominantColorLeft} 0%, 
            ${dominantColorRight} 100%) 0% 0% / ${progressPercentage}% 100% no-repeat, 
            rgba(255,255,255,0.05)` : "rgba(255,255,255,0.03)"
        }}
      >
        <div className='relative flex items-center gap-3 p-4 z-20'>
          {currentTrack.albumImageUrl && (
            <div className="relative" style={{ width: 56, minWidth: 56, height: 56 }}>
              <Image
                src={currentTrack.albumImageUrl}
                alt={currentTrack.album || ''}
                width={56}
                height={56}
                className={`rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                  currentTrack.isPlaying ? '' : 'opacity-75'
                }`}
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent to-black/20" />
            </div>
          )}
          
          <div className="flex flex-col max-w-80">
            <a
              href={currentTrack.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-semibold truncate hover:underline transition-colors duration-300 ${
                currentTrack.isPlaying 
                  ? 'text-gray-800 dark:text-gray-100' 
                  : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              {currentTrack.title}
            </a>
            <a
              href={currentTrack.artistsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs truncate text-gray-600 dark:text-gray-400 hover:underline max-w-md transition-colors duration-300"
            >
              {currentTrack.artist}
            </a>
          </div>
        </div>
      </div>
      
      {/* Hidden canvas for color extraction */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}