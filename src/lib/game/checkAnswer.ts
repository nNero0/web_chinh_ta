import {Tone, WordItem} from "@/types/word";

type UserAnswer = {
    initial: string;
    rhyme: string;
    tone: Tone;

};

export function checkAnswer(word: WordItem, answer: UserAnswer): boolean{
    return(
        word.initial === answer.initial && 
        word.rhyme === answer.rhyme &&
        word.tone === answer.tone
    );
}

