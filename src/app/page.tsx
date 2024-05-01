import BackgroundAudioStream from '@/components/background-audio-controller';
import { StartCard } from '@/components/start-card';
import { ModeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <StartCard />
    </main>
  );
}
