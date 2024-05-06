'use client';
import { Button } from '@/components/ui/button';
import { Loader2, VolumeX, Volume2 } from 'lucide-react';
import React, { useRef, useState } from 'react';

const BackgroundAudioStream = () => {
  const audio = useRef<HTMLAudioElement | null>(
    typeof Audio !== 'undefined' ? new Audio('') : null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioUrl =
    'https://res.cloudinary.com/dlpnkayyj/video/upload/v1714550803/alphabet-forge/backgroundSound-1_1_wp1fgp.mp3';
  let fadeInterval: NodeJS.Timeout | null = null;

  const fadeSoundOut = () => {
    if (fadeInterval) {
      clearInterval(fadeInterval);
    }
    fadeInterval = setInterval(() => {
      if (audio.current && audio.current.volume > 0) {
        audio.current.volume = Math.max(audio.current.volume - 0.1, 0);
      } else {
        clearInterval(fadeInterval!);
        if (audio.current) {
          audio.current.pause();
          setIsPlaying(false);
        }
      }
    }, 100);
  };

  const fadeSoundIn = () => {
    if (!audio.current) return;
    if (fadeInterval) {
      clearInterval(fadeInterval);
    }
    audio.current.volume = 0;
    audio.current.play();
    fadeInterval = setInterval(() => {
      if (audio.current && audio.current.volume < 1) {
        audio.current.volume = Math.min(audio.current.volume + 0.1, 1);
      } else {
        clearInterval(fadeInterval!);
        setIsPlaying(true);
      }
    }, 100);
  };
  const togglePlay = () => {
    if (!audioUrl) {
      console.error('Audio URL is not defined');
      return;
    }

    if (isPlaying) {
      fadeSoundOut();
    } else if (!isLoading) {
      if (!audio.current?.src || !audio.current.src.includes('blob:')) {
        setIsLoading(true);
        fetch(audioUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch audio');
            }
            return response.blob();
          })
          .then((blob) => {
            const objectURL = URL.createObjectURL(blob);
            if (audio.current) {
              audio.current.src = objectURL;
              audio.current.play();
              setIsLoading(false);
              setIsPlaying(true);
            } else {
              console.log('audio is null');
            }
          })
          .catch((error) => {
            console.error('Error fetching audio:', error);
          });
      } else {
        fadeSoundIn();
      }
    }
  };

  return (
    <div>
      <Button variant='outline' size='icon' onClick={togglePlay}>
        {isLoading ? (
          <Loader2 className='animate-spin' />
        ) : isPlaying ? (
          <Volume2 />
        ) : (
          <VolumeX />
        )}
      </Button>
    </div>
  );
};

export default BackgroundAudioStream;
