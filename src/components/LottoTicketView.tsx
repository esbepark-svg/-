import React, { useState } from "react";
import { LottoGame } from "../utils/lotto";
import { LottoBall } from "./LottoBall";
import { Copy, Check, Bookmark, Printer, RefreshCw, BarChart2, Share2 } from "lucide-react";

interface LottoTicketViewProps {
  games: LottoGame[];
  onRerollSingle: (gameId: string) => void;
  onSaveToHistory: (games: LottoGame[]) => void;
}

export const LottoTicketView: React.FC<LottoTicketViewProps> = ({
  games,
  onRerollSingle,
  onSaveToHistory,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [batchCopied, setBatchCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [showStatsId, setShowStatsId] = useState<string | null>(null);

  if (games.length === 0) {
    return null;
  }

  const handleCopySingle = (game: LottoGame) => {
    const text = `[로또 6/45 ${game.label}] ${game.numbers.map((n) => String(n).padStart(2, "0")).join(", ")} (${game.isSemiAuto ? "반자동" : "자동"})`;
    navigator.clipboard.writeText(text);
    setCopiedId(game.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleCopyBatch = () => {
    const lines = games.map(
      (g) => `${g.label} [${g.isSemiAuto ? "반자동" : "자동"}] ${g.numbers.map((n) => String(n).padStart(2, "0")).join(" ")}`
    );
    const fullText = `=== 로또 6/45 행운의 번호 ===\n${lines.join("\n")}\n대박을 기원합니다! 🍀`;
    navigator.clipboard.writeText(fullText);
    setBatchCopied(true);
    setTimeout(() => setBatchCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveToHistory(games);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-8 space-y-6 shadow-xl">
      {/* Header and Batch Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span>LOTTO 6/45 OFFICIAL TICKET</span>
            <span aria-hidden="true">·</span>
            <span>{games.length}개 게임 발급</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
            이번 회차 행운의 로또 번호
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyBatch}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 shadow-sm"
          >
            {batchCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{batchCopied ? "전체 복사됨" : "전체 복사"}</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-sm shadow-indigo-600/30"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{savedSuccess ? "보관함 저장됨" : "번호 보관"}</span>
          </button>

          <button
            onClick={handlePrint}
            title="용지 인쇄"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>인쇄</span>
          </button>
        </div>
      </div>

      {/* Ticket Games List */}
      <div className="space-y-3">
        {games.map((game) => {
          const isCopied = copiedId === game.id;
          const isStatsOpen = showStatsId === game.id;

          return (
            <div
              key={game.id}
              className="bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 md:p-5 transition-all space-y-3"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Game identifier and balls */}
                <div className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                  {/* Game label (A, B, C...) */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-7 h-7 rounded-lg bg-indigo-950/80 border border-indigo-700/60 font-mono font-extrabold text-indigo-300 text-sm flex items-center justify-center">
                      {game.label}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        game.isSemiAuto
                          ? "bg-amber-950/80 text-amber-300 border border-amber-800/60"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {game.isSemiAuto ? "반자동" : "자동"}
                    </span>
                  </div>

                  {/* 6 Lotto Balls */}
                  <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    {game.numbers.map((num) => (
                      <LottoBall
                        key={num}
                        number={num}
                        size="md"
                        isFixed={game.fixedNumbers.includes(num)}
                      />
                    ))}
                  </div>
                </div>

                {/* Single Game Action Controls */}
                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <button
                    onClick={() => setShowStatsId(isStatsOpen ? null : game.id)}
                    title="번호 분석 통계 보기"
                    className={`flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg transition-colors border ${
                      isStatsOpen
                        ? "bg-indigo-950/60 text-indigo-300 border-indigo-700"
                        : "bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800"
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">분석</span>
                  </button>

                  <button
                    onClick={() => onRerollSingle(game.id)}
                    title="이 게임만 다시 뽑기"
                    className="p-1.5 text-slate-400 hover:text-indigo-400 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleCopySingle(game)}
                    title="이 번호 복사"
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "복사됨" : "복사"}</span>
                  </button>
                </div>
              </div>

              {/* Inline Statistics Bar */}
              {isStatsOpen && (
                <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-900/50 p-3 rounded-xl">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-slate-400">총합(Sum):</span>
                    <span className="font-mono font-bold text-white tabular-nums">
                      {game.stats.sum}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-slate-400">홀:짝 비율:</span>
                    <span className="font-mono font-bold text-indigo-300 tabular-nums">
                      {game.stats.oddCount} : {game.stats.evenCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-slate-400">저:고(1~22/23~45):</span>
                    <span className="font-mono font-bold text-emerald-300 tabular-nums">
                      {game.stats.lowCount} : {game.stats.highCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-slate-400">연속 번호:</span>
                    <span
                      className={`font-semibold ${
                        game.stats.hasConsecutive ? "text-amber-400" : "text-slate-400"
                      }`}
                    >
                      {game.stats.hasConsecutive ? "포함됨" : "없음"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
