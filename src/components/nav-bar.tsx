import React from 'react';
import { Button } from './ui/button';
import BackgroundAudioStream from './background-audio-controller';
import { ModeToggle } from './theme-toggle';

function NavigationMenu() {
  return (
    <header className='flex items-center justify-between h-16 px-4 md:px-6'>
      <div className='text-lg font-semibold'>Alphabet Forge</div>
      <div className='flex items-center gap-2'>
        <BackgroundAudioStream />
        <span className='sr-only'>Background Audio Stream</span>
        <ModeToggle />
        <span className='sr-only'>Mode Toggle</span>
      </div>
    </header>
  );
}

export default NavigationMenu;
