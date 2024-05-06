'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';

import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { RefreshCwIcon } from 'lucide-react';
import {
  checkWordValidity,
  generateRandomCapitalAlphabetSet,
} from '@/lib/utils';
import axios from 'axios';

type GameStartScreenProps = {
  word: string;
  onLetterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type GameScreenProps = {
  word: string;
  skips: number;
  onLetterSelected: (letter: string) => void;
};

enum GameStatus {
  start = 'Start',
  playing = 'Playing',
  over = 'Over',
}

const numberOfLetters = 6;
const skips = 3;
const ForgeAWord = () => {
  const [word, setWord] = useState<string>('');
  const [gameSkips, setGameSkips] = useState(skips);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.start);
  const handleLetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value.trim().toUpperCase());
  };

  const handleWordUpdated = (letter: string) => {
    setWord((prev) => prev + letter);
  };

  //render game screen based on game status
  const renderGameScreen = (gameStatus: GameStatus) => {
    switch (gameStatus) {
      case GameStatus.start: {
        return (
          <GameStartScreen word={word} onLetterChange={handleLetterChange} />
        );
      }
      case GameStatus.playing: {
        return (
          <GameScreen
            word={word}
            skips={gameSkips}
            onLetterSelected={handleWordUpdated}
          />
        );
      }
    }
  };
  const { toast } = useToast();

  //render game footer buttons
  const renderFooter = (gameStatus: GameStatus) => {
    switch (gameStatus) {
      case GameStatus.start: {
        return (
          <Button
            className='w-full'
            onClick={() => {
              if (!word || !/^[a-zA-Z]$/.test(word)) {
                toast({
                  variant: 'destructive',
                  title: 'Uh oh! Something went wrong.',
                  description: 'Please enter a valid alphabet.',
                  duration: 3000,
                });
              } else {
                setGameStatus(GameStatus.playing);
              }
            }}
          >
            Play
          </Button>
        );
      }
      case GameStatus.playing: {
        return (
          <>
            <Button className='mr-2 gap-2' onClick={handleGameRestart}>
              <RefreshCwIcon />
              Restart
            </Button>
            <Button
              onClick={() => {
                if (gameSkips > 0) {
                  setGameSkips((prevSkip) => {
                    return prevSkip - 1;
                  });
                } else {
                  toast({
                    variant: 'destructive',
                    title: 'Uh oh! You have used up all your skip chances.',
                    duration: 3000,
                  });
                }
              }}
            >
              {gameSkips} - Skip
            </Button>
          </>
        );
      }
    }
  };

  const handleGameRestart = () => {
    setWord('');
    setGameSkips(skips);
    setGameStatus(GameStatus.start);
  };
  return (
    <Card className='p-4 w-64 sm:w-auto md:w-80 lg:w-96 xl:w-108'>
      {renderGameScreen(gameStatus)}
      <CardFooter className='justify-center sm:justify-normal'>
        {renderFooter(gameStatus)}
      </CardFooter>
    </Card>
  );
};

const GameStartScreen = (props: GameStartScreenProps) => {
  return (
    <CardContent className='space-y-2 pt-4'>
      <Label htmlFor='startLetter' className=''>
        Enter Starting Letter
      </Label>
      <Input
        id='startLetter'
        maxLength={1}
        pattern='^[a-zA-Z]+$'
        placeholder='Enter first letter'
        onChange={props.onLetterChange}
        autoComplete='off'
      />
    </CardContent>
  );
};

const GameScreen = (props: GameScreenProps) => {
  const [randomWord, setRandomWord] = useState<Set<string>>();
  const [meaning, setWordMeaning] = useState<string>();

  useLayoutEffect(() => {
    setRandomWord((prev) => {
      if (prev) {
        return generateRandomCapitalAlphabetSet(numberOfLetters, prev);
      } else {
        return generateRandomCapitalAlphabetSet(numberOfLetters);
      }
    });
    const findWord = async () => {
      if (props.word.length > 3) {
        const result = await checkWordValidity(props.word);
        console.log('resuls', result);
      }
    };
    findWord();
  }, [props]);

  return (
    <CardContent className='space-y-2 text-center sm:text-left sm:px-4'>
      <strong className='text-2xl'>Forge the Word</strong>
      <Input
        type='text'
        readOnly
        value={props.word}
        className='cursor-default text-center'
      />
      {randomWord ? (
        <div className='grid grid-cols-3 sm:grid-cols-6 gap-2 sm:p-4 mx-auto'>
          {Array.from(randomWord).map((letter, _key) => (
            <Button
              variant='outline'
              size='icon'
              key={_key}
              onClick={() => {
                props.onLetterSelected(letter);
              }}
            >
              {letter} <span className='sr-only'>{letter}</span>
            </Button>
          ))}
        </div>
      ) : null}
    </CardContent>
  );
};

export default ForgeAWord;
