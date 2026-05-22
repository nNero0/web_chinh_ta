import data from "@/data/words.json";
import { WordItem } from "@/types/word";

const wordList = data.words as WordItem[];

function shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
}

function getRandomItems<T>(items: T[], count: number): T[] {
    return shuffleArray(items).slice(0, count);
}

export function generateWordChoices(word: WordItem): WordItem[] {
    const wrongWords = wordList.filter((item) => item.id !== word.id);

    return shuffleArray([word, ...getRandomItems(wrongWords, 3)]);
}