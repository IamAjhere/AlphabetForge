import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function StartCard() {
  return (
    <Card className='sm:col-span-2'>
      <CardHeader className='pb-3'>
        <CardTitle>Forge A Word</CardTitle>
        <CardDescription className='max-w-lg text-balance leading-relaxed'>
          Start with any letter and create words you know or discover new ones.
          Challenge your vocabulary and creativity in this word-building game.
          Explore endless possibilities as you forge unique words and see what
          surprises await you!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Play</Button>
      </CardFooter>
    </Card>
  );
}
