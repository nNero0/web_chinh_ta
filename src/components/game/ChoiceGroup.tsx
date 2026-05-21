type ChoiceGroupProps<T extends string> = {
    title: string;
    choices: T[];
    selected: T | null;
    onSelect: (value: T) => void;
};

export function ChoiceGroup<T extends string>({
    title,
    choices,
    selected,
    onSelect,
}: ChoiceGroupProps<T>) {
    return (
        <section className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
            <h2 className="mb-4 text-lg font-semibold text-slate-700">{title}</h2>

            <div className="flex flex-wrap gap-3">
                {choices.map((item) => {
                    const isSelected = selected === item;

                    return (
                        <button
                            key={item}
                            type="button"
                            onClick={() => onSelect(item)}
                            className={[
                                "rounded-xl px-5 py-3 text-lg font-semibold transition",
                                "border shadow-sm",
                                isSelected
                                    ? "border-blue-500 bg-blue-500 text-white scale-105"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-300",
                            ].join(" ")}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}