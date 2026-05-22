"use client";

import { useEffect, useState } from "react";
import { ChoiceGroup } from "@/components/game/ChoiceGroup";
import { SelectedAnswer } from "@/components/game/SelectedAnswer";
import { generateWordChoices } from "@/lib/game/generateWordChoices";
import { getAnswerFeedback } from "@/lib/game/getAnswerFeedback";
import { Choices, generateChoices } from "@/lib/game/generateChoices";
import { getRandomWord } from "@/lib/game/getRandomWord";
import { Tone, WordItem } from "@/types/word";

type GameMode = "analyze" | "build";

export function GameScreen() {
    const [word, setWord] = useState<WordItem | null>(null);
    const [choices, setChoices] = useState<Choices | null>(null);
    const [mode, setMode] = useState<GameMode>("analyze");

    const [selectedInitial, setSelectedInitial] = useState("");
    const [selectedRhyme, setSelectedRhyme] = useState("");
    const [selectedTone, setSelectedTone] = useState<Tone | null>(null);

    const [wordChoices, setWordChoices] = useState<WordItem[]>([]);
    const [selectedWordId, setSelectedWordId] = useState("");

    const [result, setResult] = useState("");

    useEffect(() => {
        loadNewQuestion();
    }, []);

    function loadNewQuestion() {
        const nextWord = getRandomWord();

        setWord(nextWord);
        setChoices(generateChoices(nextWord));
        setWordChoices(generateWordChoices(nextWord));

        setSelectedInitial("");
        setSelectedRhyme("");
        setSelectedTone(null);
        setSelectedWordId("");
        setResult("");
    }

    function handleAnalyzeCheck() {
        if (!word) return;

        if (!selectedInitial || !selectedRhyme || !selectedTone) {
            setResult("Hãy chọn đủ phụ âm, vần và dấu.");
            return;
        }

        const feedback = getAnswerFeedback(word, {
            initial: selectedInitial,
            rhyme: selectedRhyme,
            tone: selectedTone,
        });

        setResult(feedback.message);
    }

    function handleBuildCheck() {
        if (!word) return;

        if (!selectedWordId) {
            setResult("Hãy chọn một từ.");
            return;
        }

        if (selectedWordId === word.id) {
            setResult("Đúng rồi!");
            return;
        }

        setResult(
            `Chưa đúng. ${word.initial} + ${word.rhyme} + ${word.tone} tạo thành từ “${word.word}”.`
        );
    }

    function handleCheck() {
        if (mode === "analyze") {
            handleAnalyzeCheck();
        } else {
            handleBuildCheck();
        }
    }

    function handleModeChange(nextMode: GameMode) {
        setMode(nextMode);
        setSelectedInitial("");
        setSelectedRhyme("");
        setSelectedTone(null);
        setSelectedWordId("");
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
    const isWrong = result.startsWith("Chưa đúng.");

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
                        Luyện chính tả bằng cách tách từ hoặc xây từ từ mảnh ghép.
                    </p>

                    <div className="mt-6 flex justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => handleModeChange("analyze")}
                            className={[
                                "rounded-xl px-5 py-3 font-bold shadow-sm transition",
                                mode === "analyze"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-slate-700 hover:bg-blue-50",
                            ].join(" ")}
                        >
                            Tách từ
                        </button>

                        <button
                            type="button"
                            onClick={() => handleModeChange("build")}
                            className={[
                                "rounded-xl px-5 py-3 font-bold shadow-sm transition",
                                mode === "build"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-slate-700 hover:bg-blue-50",
                            ].join(" ")}
                        >
                            Xây từ
                        </button>
                    </div>
                </header>

                {mode === "analyze" && (
                    <>
                        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-md">
                            <h2 className="mb-3 text-lg font-semibold text-slate-500">
                                Từ cần tách
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
                    </>
                )}

                {mode === "build" && (
                    <>
                        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-md">
                            <h2 className="mb-3 text-lg font-semibold text-slate-500">
                                Mảnh ghép
                            </h2>

                            <div className="flex flex-wrap justify-center gap-3 text-2xl font-black text-blue-600">
                                <span className="rounded-xl bg-blue-50 px-5 py-3">
                                    {word.initial}
                                </span>

                                <span className="rounded-xl bg-blue-50 px-5 py-3">
                                    {word.rhyme}
                                </span>

                                <span className="rounded-xl bg-blue-50 px-5 py-3">
                                    {word.tone}
                                </span>
                            </div>

                            <p className="mt-4 text-sm text-slate-500">
                                Chọn từ đúng được tạo bởi các mảnh ghép trên.
                            </p>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-slate-700">
                                Chọn từ đúng
                            </h2>

                            <div className="grid grid-cols-2 gap-3">
                                {wordChoices.map((item) => {
                                    const isSelected = selectedWordId === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setSelectedWordId(item.id)}
                                            className={[
                                                "rounded-xl border px-5 py-4 text-2xl font-bold shadow-sm transition",
                                                isSelected
                                                    ? "scale-105 border-blue-500 bg-blue-500 text-white"
                                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50",
                                            ].join(" ")}
                                        >
                                            {item.word}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}

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
                        onClick={loadNewQuestion}
                        className="flex-1 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-lg font-bold text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
                    >
                        Từ tiếp theo
                    </button>
                </div>

                {result && (
                    <div
                        className={[
                            "mt-6 rounded-2xl p-5 text-center text-xl font-bold shadow-sm",
                            isCorrect
                                ? "border border-green-200 bg-green-100 text-green-700"
                                : "",
                            isWrong ? "border border-red-200 bg-red-100 text-red-700" : "",
                            !isCorrect && !isWrong
                                ? "border border-yellow-200 bg-yellow-100 text-yellow-700"
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