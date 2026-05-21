export type Tone = 
    | "ngang"
    | "sắc"
    | "huyền"
    | "hỏi"
    | "ngã"
    | "nặng";

export interface WordItem {
    id: string;
    word: string;
    initial: string;
    rhyme: string;
    tone: Tone;
    category: string;
    difficulty: number;
    confusions: string[];

}