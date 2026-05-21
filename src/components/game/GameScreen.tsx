"use client";

import { useEffect, useState } from "react";
import { ChoiceGroup } from "@/components/game/ChoiceGroup";
import { SelectedAnswer } from "@/components/game/SelectedAnswer";
import { checkAnswer } from "@/lib/game/checkAnswer";
import { Choices, generateChoices } from "@/lib/game/generateChoices";
import { getRandomWord } from "@/lib/game/getRandomWord";
import { Tone, WordItem } from "@/types/word";

export function GameScreen() {
    const [word, setWord] = useState<WordItem | null>(null);
    const [choices, setChoices] = useState<Choices | null>(null);

    const [selectedInitial, setSelectedInitial] = useState("");
    const [selectedRhyme, setSelectedRhyme] = useState("");
    const [selectedTone, setSelectedTone] = useState<Tone | null>(null);

    const [result, setResult] = useState("");

    useEffect(() => {
        const firstWord = getRandomWord();

        setWord(firstWord);
        setChoices(generateChoices(firstWord));
    }, []);

    function handleCheck() {
        if (!word) return;

        if (!selectedInitial || !selectedRhyme || !selectedTone) {
            setResult("Hãy chọn đủ phụ âm, vần và dấu.");
            return;
        }

        const isCorrect = checkAnswer(word, {
            initial: selectedInitial,
            rhyme: selectedRhyme,
            tone: selectedTone,
        });

        setResult(isCorrect ? "Đúng rồi!" : "Chưa đúng.");
    }

    function handleNext() {
        const nextWord = getRandomWord();

        setWord(nextWord);
        setChoices(generateChoices(nextWord));

        setSelectedInitial("");
        setSelectedRhyme("");
        setSelectedTone(null);
        setResult("");
    }

    if (!word || !choices) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100">
                <p className="text-lg font-medium text-slate-600">Đang tải...</p>
            </main>
        );
    }

    const isCorrect = result === "Đúng rồi!";
    const isWrong = result === "Chưa đúng.";

    return (
        <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 px-4 py-8">
            <div className="mx-auto max-w-3xl">
                <header className="mb-8 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                        Lớp 1
                    </p>

                    <h1 className="text-4xl font-black text-slate-800">
                        Luyện ghép tiếng Việt
                    </h1>

                    <p className="mt-3 text-slate-600">
                        Chọn đúng phụ âm đầu, vần và dấu thanh để tạo thành từ.
                    </p>
                </header>

                <section className="mb-6 rounded-3xl bg-white p-8 text-center shadow-md border border-slate-200">
                    <h2 className="mb-3 text-lg font-semibold text-slate-500">
                        Từ cần ghép
                    </h2>

                    <p className="text-6xl font-black tracking-wide text-blue-600">
                        {word.word}
                    </p>

                    <p className="mt-4 text-sm text-slate-500">
                        Chủ đề: {word.category} · Độ khó: {word.difficulty}
                    </p>
                </section>

                <div className="space-y-5">
                    <ChoiceGroup
                        title="Phụ âm đầu"
                        choices={choices.initials}
                        selected={selectedInitial || null}
                        onSelect={setSelectedInitial}
                    />

                    <ChoiceGroup
                        title="Vần"
                        choices={choices.rhymes}
                        selected={selectedRhyme || null}
                        onSelect={setSelectedRhyme}
                    />

                    <ChoiceGroup
                        title="Dấu thanh"
                        choices={choices.tones}
                        selected={selectedTone}
                        onSelect={setSelectedTone}
                    />

                    <SelectedAnswer
                        initial={selectedInitial}
                        rhyme={selectedRhyme}
                        tone={selectedTone}
                    />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={handleCheck}
                        className="flex-1 rounded-2xl bg-blue-600 px-6 py-4 text-lg font-bold text-white shadow-md transition hover:bg-blue-700 active:scale-95"
                    >
                        Kiểm tra
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 rounded-2xl bg-white px-6 py-4 text-lg font-bold text-slate-700 shadow-md border border-slate-200 transition hover:bg-slate-50 active:scale-95"
                    >
                        Từ tiếp theo
                    </button>
                </div>

                {result && (
                    <div
                        className={[
                            "mt-6 rounded-2xl p-5 text-center text-xl font-bold shadow-sm",
                            isCorrect
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "",
                            isWrong ? "bg-red-100 text-red-700 border border-red-200" : "",
                            !isCorrect && !isWrong
                                ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                : "",
                        ].join(" ")}
                    >
                        {result}
                    </div>
                )}
            </div>
        </main>
    );
}