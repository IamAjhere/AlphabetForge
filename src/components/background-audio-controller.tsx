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

  const togglePlay = () => {
    if (!audioUrl) {
      console.error('Audio URL is not defined');
      return;
    }

    if (isPlaying) {
      audio.current?.pause();
      setIsPlaying(false);
    } else if (!isLoading) {
      if (
        !audio.current?.src ||
        audio.current.src === `${window.location.origin}/`
      ) {
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
              console.log('play');
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
        audio.current?.play();
        setIsPlaying(true);
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
