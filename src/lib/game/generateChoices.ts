import data from "@/data/words.json";
import { Tone, WordItem } from "@/types/word";

const wordList = data.words as WordItem[];

export type Choices = {
    initials: string[];
    rhymes: string[];
    tones: Tone[];
};

function shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
}

function getRandomItems<T>(items: T[], count: number): T[] {
    return shuffleArray(items).slice(0, count);

}

export function generateChoices(word: WordItem): Choices {
    const allInitials = [...new Set(wordList.map((w) => w.initial))];
    const allRhymes = [...new Set(wordList.map((w) => w.rhyme))];
    const allTones = [...new Set(wordList.map((w) => w.tone))] as Tone[];

    const wrongInitials = allInitials.filter((item) => item !== word.initial);
    const wrongRhymes = allRhymes.filter((item) => item !== word.rhyme);
    const wrongTones = allTones.filter((item) => item !== word.tone);

    return {
        initials: shuffleArray([
            word.initial,
            ...getRandomItems(wrongInitials, 2),
        ]),
        rhymes: shuffleArray([
            word.rhyme,
            ...getRandomItems(wrongRhymes, 2),
        ]),
        tones: shuffleArray([
            word.tone,
            ...getRandomItems(wrongTones, 2),
        ]),
    };
}