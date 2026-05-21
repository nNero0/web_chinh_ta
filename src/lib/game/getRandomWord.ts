import data from "@/data/words.json";
import { WordItem } from "@/types/word";

const wordList = data.words as WordItem[];

export function getRandomWord(): WordItem {
    const randomIndex = Math.floor(Math.random() * wordList.length);

    return wordList[randomIndex];
}