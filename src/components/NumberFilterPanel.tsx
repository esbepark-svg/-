import React from "react";
import { getBallColorClass } from "../utils/lotto";
import { Pin, Ban, RotateCcw, Sparkles } from "lucide-react";

interface NumberFilterPanelProps {
  fixedNumbers: number[];
  excludedNumbers: number[];
  onToggleFixed: (num: number) => void;
  onToggleExcluded: (num: number) => void;
  onClearFilters: () => void;
}

export const NumberFilterPanel: React.FC<NumberFilterPanelProps> = ({
  fixedNumbers,
  excludedNumbers,
  onToggleFixed,
  onToggleExcluded,
  onClearFilters,
}) => {
  const [activeMode, setActiveMode] = React.useState<"fixed" | "excluded">("fixed");

  const handleNumberClick = (num: number) => {
    if (activeMode === "fixed") {
      onToggleFixed(num);
    } else {
      onToggleExcluded(num);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
            <span>고정수 & 제외수 커스텀 필터</span>
            {(fixedNumbers.length > 0 || excludedNumbers.length > 0) && (
              <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-2 py-0.5 rounded">
                고정 {fixedNumbers.length}개 · 제외 {excludedNumbers.length}개
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            포함하고 싶은 번호(최대 5개)나 제외하고 싶은 번호를 1~45 그리드에서 직접 지정하세요.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveMode("fixed")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                activeMode === "fixed"
                  ? "bg-amber-500 text-slate-950 font-bold shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Pin className="w-3.5 h-3.5" />
              <span>고정수 선택 ({fixedNumbers.length}/5)</span>
            </button>
            <button
              onClick={() => setActiveMode("excluded")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                activeMode === "excluded"
                  ? "bg-rose-500 text-white font-bold shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Ban className="w-3.5 h-3.5" />
              <span>제외수 선택 ({excludedNumbers.length}/20)</span>
            </button>
          </div>

          {(fixedNumbers.length > 0 || excludedNumbers.length > 0) && (
            <button
              onClick={onClearFilters}
              title="필터 초기화"
              className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Helper guide */}
      <div className="text-xs text-slate-400 flex items-center justify-between">
        <span>
          {activeMode === "fixed"
            ? "💡 번호를 클릭하면 무조건 포함되는 [고정수]로 지정됩니다 (최대 5개)."
            : "🚫 번호를 클릭하면 생성 시 절대 나오지 않는 [제외수]로 지정됩니다."}
        </span>
        <span className="text-[11px] text-slate-400">
          색상: 1~10 노랑 · 11~20 파랑 · 21~30 빨강 · 31~40 회색 · 41~45 초록
        </span>
      </div>

      {/* 1~45 Number Grid */}
      <div className="grid grid-cols-9 sm:grid-cols-15 gap-1.5 pt-1">
        {Array.from({ length: 45 }, (_, i) => i + 1).map((num) => {
          const isFixed = fixedNumbers.includes(num);
          const isExcluded = excludedNumbers.includes(num);
          const colorInfo = getBallColorClass(num);

          let stateStyle = "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600";
          if (isFixed) {
            stateStyle = "bg-amber-500 text-slate-950 font-bold border-amber-300 ring-2 ring-amber-400 shadow";
          } else if (isExcluded) {
            stateStyle = "bg-rose-950/80 text-rose-400 border-rose-800/80 line-through opacity-70";
          }

          return (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className={`h-9 rounded-lg border text-xs font-mono font-bold transition-all flex flex-col items-center justify-center relative ${stateStyle}`}
            >
              <span>{num}</span>
              {isFixed && (
                <span className="text-[8px] font-sans font-extrabold absolute -top-1.5 -right-1 bg-slate-950 text-amber-400 px-1 rounded-full border border-amber-500/60">
                  고정
                </span>
              )}
              {isExcluded && (
                <span className="text-[8px] font-sans font-extrabold absolute -top-1.5 -right-1 bg-slate-950 text-rose-400 px-1 rounded-full border border-rose-500/60">
                  제외
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
