'use client';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Gamepad2Icon } from 'lucide-react';

export function StartCard() {
  const router = useRouter();

  return (
    <Card className='sm:col-span-3'>
      <CardHeader className='pb-3 text-center sm:text-left'>
        <CardTitle>Forge A Word</CardTitle>
        <CardDescription className='max-w-lg leading-relaxed text-center sm:text-left'>
          Start with any letter and create words you know or discover new ones.
          Challenge your vocabulary and creativity in this word-building game.
          Explore endless possibilities as you forge unique words and see what
          surprises await you!
        </CardDescription>
      </CardHeader>
      <CardFooter className='justify-center sm:justify-normal'>
        <Button
          className='w-full sm:w-auto gap-2'
          onClick={() => router.push('/forgeaword')}
        >
          <Gamepad2Icon />
          Play
        </Button>
      </CardFooter>
    </Card>
  );
}
