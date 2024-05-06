import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomCapitalAlphabetSet(
  limit: number,
  lettersToRemove?: Set<string>
): Set<string> {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const vowels = 'AEIOU';
  let modifiedAlphabet = alphabet;
  let modifiedVowels = vowels;

  // Remove specified letters from alphabet and vowels
  if (lettersToRemove && lettersToRemove.size > 0) {
    lettersToRemove.forEach((letter) => {
      modifiedAlphabet = modifiedAlphabet.replace(new RegExp(letter, 'gi'), '');
      modifiedVowels = modifiedVowels.replace(new RegExp(letter, 'gi'), '');
    });
  }

  const alphabetArray = modifiedAlphabet.split('');
  const vowelArray = modifiedVowels.split('');
  const uniqueLetters = new Set<string>();

  // Add at least one vowel
  const randomVowelIndex = Math.floor(Math.random() * vowelArray.length);
  const randomVowel = vowelArray[randomVowelIndex];
  uniqueLetters.add(randomVowel);

  // Add remaining letters
  while (uniqueLetters.size < limit) {
    const randomIndex = Math.floor(Math.random() * alphabetArray.length);
    const randomLetter = alphabetArray[randomIndex];
    uniqueLetters.add(randomLetter);
  }

  return uniqueLetters;
}

export const checkWordValidity = async (word: string) => {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (response.data) {
      return response.data;
      console.log(response);
    } else {
      console.error('Error fetching word validity:', response);
    }
  } catch (error) {
    console.error('Error fetching word validity:', error);
  }
};
