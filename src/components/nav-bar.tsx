'use client';
import React from 'react';
import { Button } from './ui/button';
import BackgroundAudioStream from './background-audio-controller';
import { ModeToggle } from './theme-toggle';
import { useRouter, usePathname } from 'next/navigation';

function NavigationMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const handleHomeButtonClick = () => {
    if (pathname === '/') {
      return;
    }
    router.push('/');
  };

  return (
    <header className='flex items-center justify-between h-16 px-4 md:px-6'>
      <div
        className='text-lg font-semibold cursor-pointer'
        onClick={handleHomeButtonClick}
      >
        Alphabet Forge
      </div>
      <div className='flex items-center gap-2'>
        <ModeToggle />
        <span className='sr-only'>Mode Toggle</span>
        <BackgroundAudioStream />
        <span className='sr-only'>Background Audio Stream</span>
      </div>
    </header>
  );
}

export default NavigationMenu;
