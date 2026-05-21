import { Tone } from "@/types/word";

type SelectedAnswerProps = {
    initial: string;
    rhyme: string;
    tone: Tone | null;
};

export function SelectedAnswer({
    initial,
    rhyme,
    tone,
}: SelectedAnswerProps) {
    return (
        <section className="rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-5">
            <h2 className="mb-3 text-lg font-semibold text-blue-800">
                Đáp án đang chọn
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xl font-bold text-slate-800">
                <span className="rounded-xl bg-white px-5 py-3 shadow-sm">
                    {initial || "_"}
                </span>

                <span>+</span>

                <span className="rounded-xl bg-white px-5 py-3 shadow-sm">
                    {rhyme || "_"}
                </span>

                <span>+</span>

                <span className="rounded-xl bg-white px-5 py-3 shadow-sm">
                    {tone || "_"}
                </span>
            </div>
        </section>
    );
}