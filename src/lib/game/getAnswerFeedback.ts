import { Tone, WordItem } from "@/types/word";

export type UserAnswer = {
    initial: string;
    rhyme: string;
    tone: Tone;
};

export type AnswerFeedback = {
    isCorrect: boolean;
    message: string;
    mistakeTypes: string[];
};

export function getAnswerFeedback(
    word: WordItem,
    answer: UserAnswer
): AnswerFeedback {
    const mistakeTypes: string[] = [];

    if (word.initial !== answer.initial) {
        mistakeTypes.push("initial");
    }

    if (word.rhyme !== answer.rhyme) {
        mistakeTypes.push("rhyme");
    }

    if (word.tone !== answer.tone) {
        mistakeTypes.push("tone");
    }

    if (mistakeTypes.length === 0) {
        return {
            isCorrect: true,
            message: "Đúng rồi!",
            mistakeTypes: [],
        };
    }

    const hints: string[] = [];

    if (mistakeTypes.includes("initial")) {
        hints.push(`Từ “${word.word}” bắt đầu bằng “${word.initial}”.`);
    }

    if (mistakeTypes.includes("rhyme")) {
        hints.push(`Từ “${word.word}” có vần “${word.rhyme}”.`);
    }

    if (mistakeTypes.includes("tone")) {
        hints.push(`Từ “${word.word}” có dấu ${word.tone}.`);
    }

    return {
        isCorrect: false,
        message: `Chưa đúng. ${hints.join(" ")}`,
        mistakeTypes,
    };
}